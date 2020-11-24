FROM nvidia/cuda:10.0-cudnn7-devel-ubuntu16.04

RUN apt-get update && apt-get install -y --no-install-recommends \
         build-essential \
         cmake \
         git \
         curl \
         ca-certificates \
         libjpeg-dev \
         libpng-dev && \
     rm -rf /var/lib/apt/lists/*

RUN curl -o ~/miniconda.sh https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh && \
    chmod +x ~/miniconda.sh && \
    ~/miniconda.sh -b -p /opt/conda && \
    rm ~/miniconda.sh
RUN /opt/conda/bin/conda install -y python=3.7 opencv numpy scipy==1.1.0 matplotlib Psutil Pillow&& \
    /opt/conda/bin/conda clean -ya
RUN /opt/conda/bin/pip install ISR[gpu] PyYAML Flask
RUN apt-get update && apt-get install -y --no-install-recommends \
     wget && \
     rm -rf /var/lib/apt/lists/*
RUN wget -P /root/.keras/datasets/ \
    https://public-asai-dl-models.s3.eu-central-1.amazonaws.com/ISR/rdn-C6-D20-G64-G064-x2/ArtefactCancelling/rdn-C6-D20-G64-G064-x2_ArtefactCancelling_epoch219.hdf5 && \
    wget -P /root/.keras/datasets/ \
    https://public-asai-dl-models.s3.eu-central-1.amazonaws.com/ISR/rrdn-C4-D3-G32-G032-T10-x4-GANS/rrdn-C4-D3-G32-G032-T10-x4_epoch299.hdf5

ENV PATH /opt/conda/bin:$PATH

COPY app.py /app/app.py

WORKDIR /app
EXPOSE 4103
ENTRYPOINT ["python"]
CMD ["app.py"]
