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
RUN /opt/conda/bin/conda install -y cudatoolkit=10.0 pytorch=1.1.0 torchvision=0.3.0 opencv numpy matplotlib -c pytorch && \
    /opt/conda/bin/conda install -y x264=='1!152.20180717' ffmpeg=4.0.2 -c conda-forge && \
    /opt/conda/bin/conda clean -ya
ENV PATH /opt/conda/bin:$PATH


RUN pip install lmdb pyyaml seaborn Flask requests
WORKDIR /app
RUN mkdir -p COPY Zooming-Slow-Mo-CVPR-2020/codes/models
COPY Zooming-Slow-Mo-CVPR-2020/codes/models Zooming-Slow-Mo-CVPR-2020/codes/models
ENV FORCE_CUDA="1"
RUN cd Zooming-Slow-Mo-CVPR-2020/codes/models/modules/DCNv2 && bash make.sh
COPY . .

EXPOSE 4203
ENTRYPOINT ["python"]
CMD ["app.py"]
