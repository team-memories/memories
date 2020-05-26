FROM nvidia/cuda:10.0-cudnn7-devel-ubuntu16.04

RUN apt-get update && apt-get install -y --no-install-recommends \
         build-essential \
         cmake \
         git \
         curl \
         ca-certificates \
         libjpeg-dev \
         libsm6 \
         libxext6 \
         libxrender-dev \
         wget \
         libpng-dev && \
     rm -rf /var/lib/apt/lists/*

RUN curl -o ~/miniconda.sh https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh && \
    chmod +x ~/miniconda.sh && \
    ~/miniconda.sh -b -p /opt/conda && \
    rm ~/miniconda.sh
ENV PATH /opt/conda/bin:$PATH
COPY environment.yml .
RUN conda env create -f environment.yml && \
    conda clean -ya

# Make RUN commands use the new environment:
SHELL ["conda", "run", "-n", "deoldify", "/bin/bash", "-c"]
RUN pip install Flask requests
WORKDIR /app
COPY . .

RUN mkdir models
RUN wget https://www.dropbox.com/s/336vn9y4qwyg9yz/ColorizeVideo_gen.pth?dl=0 -O ./models/ColorizeVideo_gen.pth

# The code to run when container is started:
EXPOSE 4202
ENV PATH /opt/conda/envs/deoldify/bin:$PATH
ENTRYPOINT ["python"]
CMD ["app.py"]
