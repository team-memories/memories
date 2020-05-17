FROM pytorch/pytorch:1.1.0-cuda10.0-cudnn7.5-runtime
# Not Implemented
numpy opencv-python lmdb pyyaml pickle matplotlib seaborn

WORKDIR /workspace
RUN chmod -R a+w .

FROM python:3.7-alpine
WORKDIR /code
ENV FLASK_APP app.py
ENV FLASK_RUN_HOST 0.0.0.0
RUN apk add --no-cache gcc musl-dev linux-headers
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY . .
CMD ["flask", "run"]