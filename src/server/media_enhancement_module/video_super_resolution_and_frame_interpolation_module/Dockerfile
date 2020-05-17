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
RUN /opt/conda/bin/conda install -y ffmpeg && \
    /opt/conda/bin/conda install -y pytorch==1.1.0 torchvision==0.3.0 cudatoolkit=10.0 -c pytorch && \
    /opt/conda/bin/conda clean -ya
ENV PATH /opt/conda/bin:$PATH

RUN pip install numpy opencv-python lmdb pyyaml matplotlib seaborn
WORKDIR /app
COPY . .
RUN cd Zooming-Slow-Mo-CVPR-2020/codes/models/modules/DCNv2 && bash make.sh && python test.test

EXPOSE 4203
ENTRYPOINT ["python"]
CMD ["app.py"]