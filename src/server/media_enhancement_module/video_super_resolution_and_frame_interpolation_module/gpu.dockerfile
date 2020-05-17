FROM pytorch/pytorch:1.1.0-cuda10.0-cudnn7.5-runtime
RUN pip install -y numpy opencv-python lmdb pyyaml pickle matplotlib seaborn

COPY app.py /app/app.py

WORKDIR /app
EXPOSE 4103
ENTRYPOINT ["python"]
CMD ["app.py"]