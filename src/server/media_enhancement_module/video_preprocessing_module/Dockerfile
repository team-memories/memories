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
RUN /opt/conda/bin/conda install -y ffmpeg && \
    /opt/conda/bin/conda clean -ya
ENV PATH /opt/conda/bin:$PATH
RUN /opt/conda/bin/pip install Flask requests

COPY app.py /app/app.py

WORKDIR /app
EXPOSE 4201
ENTRYPOINT ["python"]
CMD ["app.py"]