FROM python:3.12

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt --no-cache-dir

COPY tokio/ .

CMD [ "python", "manage.py", "runserver", "0:8000" ]