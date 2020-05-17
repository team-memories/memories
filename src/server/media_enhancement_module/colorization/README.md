## Colorization Model

Download pretrain model

```
python preprocess/download_models.py
mkdir whole_model && cd whole_model
unzip ../whole_model.zip

# main_woflow.py 사용하고 싶을 때. download_models.py에서 주석제거하고 다운로드 받기
unzip ckpt_woflow.zip
```

### Requirement

Require packages: tensorflow 2.0.0 / scipy 1.1.0 / pypng / requires , we tested on Cuda 10.0 + cudnn 7.5 + T4

Create conda envrionment

```
conda env create -f environment.yml or conda_gpu_cuda10.yml
```

colorization을 실행하기 전에 optical flow를 추출해야함.
pytorch-pwc folder 참고

```
python pytorch_pwc/run_data.py --in_dir data/color_input --out_dir data/FLOWImages_GRAY --grayscale
```


Excute in media-enhancement-module folder

```
python colorization/main_woflow_up.py --model colorization/ckpt_woflow --use_gpu 1 --test_dir data/color_input --out_dir data/VFI_input/

python colorization/test_main_whole.py --model colorization/whole_model --test-dir data/color_input --flow-root-dir data/

```

Excute in colorization folder

```
python main_woflow_up.py --model ckpt_woflow --use_gpu 1 --test_dir ../data/color_input --out_dir ../data/VFI_input/

python test_main_whole.py --model whole_model --test-dir ../data/color_input --flow-root-dir ../data
```





### Citation
```
@InProceedings{Lei_2019_CVPR,
author = {Lei, Chenyang and Chen, Qifeng},
title = {Fully Automatic Video Colorization With Self-Regularization and Diversity},
booktitle = {The IEEE Conference on Computer Vision and Pattern Recognition (CVPR)},
month = {June},
year = {2019}
}
```
