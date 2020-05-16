FROM tensorflow/tensorflow:2.0.1
RUN apt-get update && apt-get install -y --no-install-recommends \
      bzip2 \
      g++ \
      git \
      graphviz \
      libgl1-mesa-glx \
      libhdf5-dev \
      openmpi-bin \
      screen \
      wget && \
    rm -rf /var/lib/apt/lists/* \
    apt-get upgrade

ENV TENSOR_HOME /home/isr
WORKDIR $TENSOR_HOME

COPY ISR/ISR ./ISR
COPY ISR/scripts ./scripts
COPY ISR/weights ./weights
COPY ISR/config.yml ./
COPY ISR/setup.py ./

RUN pip install --upgrade pip
RUN pip install -e ".[gpu]" --ignore-installed
RUN pip install Flask scipy==1.1.0

COPY app.py /app/app.py

WORKDIR /app
EXPOSE 4103
ENTRYPOINT ["python"]
CMD ["app.py"]