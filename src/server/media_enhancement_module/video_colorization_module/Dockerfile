FROM tensorflow/tensorflow:2.0.0-gpu

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
RUN /opt/conda/bin/conda install -y python=3.6.9 psutil opencv=3.4.2 pyyaml>=5.1 pillow matplotlib scipy==1.1.0 && \
    /opt/conda/bin/conda clean -ya
RUN /opt/conda/bin/conda install -y tensorflow=2.0.0 && \
    /opt/conda/bin/conda clean -ya
ENV PATH /opt/conda/bin:$PATH
RUN /opt/conda/bin/pip install Flask requests pypng

WORKDIR /app
COPY . .
RUN cd colorization && python download_models.py && unzip ckpt_woflow.zip
RUN cd colorization && python change_conv2d.py

EXPOSE 4202
ENTRYPOINT ["python"]
CMD ["app.py"]