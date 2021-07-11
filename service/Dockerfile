FROM python:3.8.11

WORKDIR /api

COPY requirements.txt requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENTRYPOINT [ "flask", "run", "--host=0.0.0.0" ]