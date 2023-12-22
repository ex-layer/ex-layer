FROM python:3.12-slim

ENV DATABASE_URL=placeholder
ENV PASSWORD=placeholder


ARG DATABASE_URL_ARG
ARG PASSWORD_ARG

ENV DATABASE_URL=${DATABASE_URL_ARG}
ENV PASSWORD=${PASSWORD_ARG}

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

CMD [ "python", "app.py" ]