FROM python:3
ENV PYTHONUNBUFFERED=1
WORKDIR /django
COPY . .
COPY requirements.txt ./
RUN pip install -r requirements.txt