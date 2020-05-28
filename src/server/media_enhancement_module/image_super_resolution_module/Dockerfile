FROM ubuntu:18.04

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
RUN /opt/conda/bin/conda install -y opencv numpy scipy==1.1.0 matplotlib Psutil Pillow&& \
    /opt/conda/bin/conda clean -ya
RUN /opt/conda/bin/pip install ISR[gpu] PyYAML Flask

ENV PATH /opt/conda/bin:$PATH

COPY app.py /app/app.py

WORKDIR /app
EXPOSE 4103
ENTRYPOINT ["python"]
CMD ["app.py"]