FROM python:3.10-alpine AS base
WORKDIR /app
COPY requirements.txt requirements.txt
RUN pip install requests
RUN pip install -r requirements.txt

FROM base AS builder
COPY . /app
CMD ["python", "main.py"]
