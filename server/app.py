from flask import Flask, render_template, request
from waitress import serve
import random
from redis import Redis

app = Flask(__name__)
# redis = Redis(host='redis', port=6379)

@app.route('/')
def index():
    return "test"



@app.route('/')
if __name__ == "__main__":
    serve(app, host="0.0.0.0", port=5000) 