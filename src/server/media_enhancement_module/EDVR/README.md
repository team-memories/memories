run git clone https://github.com/xinntao/EDVR.git

run pip install cupy-cuda100

cd ./codes/models/archs/dcn/

run python setup.py develop

run pip install numpy opencv-python lmdb pyyaml

run pip install tb-nightly future

run sudo apt-get install -y axel imagemagick

go https://github.com/xinntao/EDVR/wiki/Model-Zoo and download "EDVR_Vimeo90K_SR_L" pretrain model

put pretrain model at /EDVR/experiments/pretrained_models 

put video at /EDVR as name "test.mp4"

cd /EDVR/codes

put test.py at codes

run python3 test.py



