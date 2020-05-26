from deoldify import device
from deoldify.device_id import DeviceId
import torch
import argparse, os
#choices:  CPU, GPU0...GPU7
torch.backends.cudnn.benchmark=True

parser = argparse.ArgumentParser()
parser.add_argument("--in_file", default="data/color_input/test.jpg", type=str, help="input file path")
parser.add_argument("--out_dir", default="data/output", type=str, help="output folder")
parser.add_argument("--gpu", default=DeviceId.CPU, type=DeviceId.argparse, choices=list(DeviceId))
parser.add_argument("--render_factor", default=21, type=int, help="colorization render factor")

args = parser.parse_args()
in_file = args.in_file
out_dir = args.out_dir
gpu = args.gpu
render_factor = args.render_factor

os.makedirs(out_dir, exist_ok=True)

device.set(device=gpu)

import fastai
from deoldify.visualize import *
from PIL import Image

image_name = os.path.basename(in_file)
print('image name', image_name)
colorizer = get_image_colorizer(artistic=False)
img = colorizer.get_transformed_image(in_file, render_factor=render_factor)
img.save(os.path.join(out_dir, image_name))


