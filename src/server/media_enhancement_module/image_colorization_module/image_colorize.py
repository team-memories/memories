from deoldify import device
from deoldify.device_id import DeviceId
import torch
import argparse, os
#choices:  CPU, GPU0...GPU7
torch.backends.cudnn.benchmark=True

parser = argparse.ArgumentParser()
parser.add_argument("--in_file", type=str, help="input file path")
parser.add_argument("--out_file", type=str, help="output file path")
parser.add_argument("--gpu", type=DeviceId.argparse, choices=list(DeviceId))
parser.add_argument("--render_factor", default=21, type=int, help="colorization render factor")

args = parser.parse_args()
in_file = args.in_file
out_file = args.out_file
gpu = args.gpu
render_factor = args.render_factor

os.makedirs(out_file, exist_ok=True)

device.set(device=gpu)

import fastai
from deoldify.visualize import *
from PIL import Image

print(f'Colorizing {in_file} to {out_file}')
colorizer = get_image_colorizer(artistic=False)
img = colorizer.get_transformed_image(in_file, render_factor=render_factor)
img.save(out_file)


