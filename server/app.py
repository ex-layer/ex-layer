from flask import Flask, render_template, request, jsonify
import json
from waitress import serve
import random
import psycopg2
from psycopg2.extras import DateTimeTZRange
from redis import Redis
import os
from datetime import datetime
from dateutil import parser
from decimal import Decimal

app = Flask(__name__)
# redis = Redis(host='redis', port=6379)

# DateTimeEncoder also doubles down as a decimal encoder
class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, (datetime, DateTimeTZRange)):
            return obj.isoformat()
        elif isinstance(obj, Decimal):
            return float(obj)
        return super().default(obj)

def parse_query(cursor):
    result = cursor.fetchall()
    columns = [desc[0] for desc in cursor.description]
    result_list = []

    for row in result:
        row_dict = dict(zip(columns, row))
        for key, value in row_dict.items():
            if isinstance(value, (datetime, DateTimeTZRange)):
                row_dict[key] = value.isoformat()
        result_list.append(row_dict)

    # Use the custom encoder when converting to JSON
    json_result = json.dumps(result_list, indent=2, cls=DateTimeEncoder)

    return json_result




# connect to the database using environment variables
def db_connect(host = os.environ["DATABASE_URL"], password =os.environ["PASSWORD"]):
    conn = psycopg2.connect(
    database = "dev", 
    user = "postgres", 
    host= f'{host}',
    password = f"{password}",
    port = 5432
    )
    return conn



@app.route('/')
def index():
    return "test"


# RETURN ALL USERS IN DEV USER TABLE
@app.route('/user', methods = ['GET', 'POST'])
def user():


    conn = db_connect()
    if request.method =='GET':
        try: 
            cursor=conn.cursor()
            query = "SELECT * FROM users"
            cursor.execute(query)

            json_result = parse_query(cursor)

            return json_result
        except Exception as e:
            print(f"Error: {e}")

            # return an error response with details
            return jsonify({'status': 'error', 'message': str(e)})
        
        finally: 
            cursor.close()
            conn.close()


    
    # insert into users email, and tier (optional)
    if request.method =='POST':
        try:
            response_data = request.get_json()

            email = response_data["email"]
            tier = response_data["tier"]


            cursor=conn.cursor()
            query = "INSERT INTO users (email, tier) VALUES (%s, %s)"
            cursor.execute(query, (email, tier))
            conn.commit()
            return jsonify({'status': 'success'})
            
        except Exception as e:
            conn.rollback()
            # return an error response with details
            return jsonify({'status': 'error', 'message': str(e)})

        finally:
            cursor.close()
            conn.close()
            

       
@app.route('/revenue', methods = ['GET', 'POST', 'DELETE'])
def revenue():
    user_id = request.args.get('user')
    conn = db_connect()

    if not user_id:
        return 

    # get all revenue entries for user_id
    if request.method == 'GET':
        try: 
            cursor=conn.cursor()
            query = "SELECT * FROM revenue WHERE user_id = %s;"
            cursor.execute(query, (user_id))

            json_result = parse_query(cursor)

            return json_result

        except Exception as e:
            conn.rollback()
            # return an error response with details
            return jsonify({'status': 'error', 'message': str(e)})

        finally:
            cursor.close()
            conn.close()



    # TO INSERT A REVENUE:
    # user_id
    # response_data["amount"] --> DECIMAL 
    # response_data["payment_date"] --> TIMESTAMP OBJECT
    # resonse_data["category"] --> JSON

    if request.method =='POST':
        
        try:
            cursor=conn.cursor()
            response_data = request.get_json()

            amount = response_data["amount"]
            category = json.dumps(response_data["category"])

            payment_date = response_data["payment_date"]
            payment_date = parser.parse(payment_date) # --> parse (20223-01-01 12:30:00) into a datetime object

            query = """
                INSERT INTO revenue (user_id, amount, payment_date, category)
                VALUES (%s, %s, %s, %s)
            """
            cursor.execute(query, (user_id, amount, payment_date, category))
            conn.commit()

            return jsonify({'status': 'success'})

        except Exception as e:
            conn.rollback()
            # return an error response with details
            return jsonify({'status': 'error', 'message': str(e)})


        finally:
            cursor.close()
            conn.close()

    # Delete requires payment ID
    if request.method == 'DELETE':
        try:
            cursor=conn.cursor()
            response_data = request.get_json()
            payment_id = response_data["payment"]

            query = '''
                DELETE FROM revenue where payment_id = %s;
            '''

            cursor.execute(query, payment_id)
            conn.commit()
            return jsonify({'status': 'success'})
        except Exception as e:
            conn.rollback()
            return jsonify({'status': 'error', 'message': str(e)})
        finally:
            cursor.close()
            conn.close()





    return ""

if __name__ == "__main__":
    serve(app, host="0.0.0.0", port=80) 