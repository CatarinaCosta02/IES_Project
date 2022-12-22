FROM python:3.10 AS base
WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

FROM base AS builder
COPY . /app
CMD ["python", "main.py"]
