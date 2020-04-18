## Colorization Model

Download pretrain model

```
python download_models.py
unzip ckpt_woflow.zip
```

### Requirement

Require packages: tensorflow 2.0.0 / scipy 1.1.0 / pypng / requires , we tested on Cuda 10.0 + cudnn 7.5 + T4

Create conda envrionment

```
conda env create -f environment.yml or conda_gpu_cuda10.yml
```


Excute in media-enhancement-module folder

```
python colorization/main_woflow_up.py --model colorization/ckpt_woflow --use_gpu 1 --test_dir data/color_input --out_dir data/VFI_input/
```

Excute in colorization folder

```
python main_woflow_up.py --model ckpt_woflow --use_gpu 1 --test_dir ../data/color_input --out_dir ../data/VFI_input/
```


***only use main_woflow_up.py, the rest update later***
