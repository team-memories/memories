from deoldify import device
from deoldify.device_id import DeviceId
import torch
import argparse, os
#choices:  CPU, GPU0...GPU7
torch.backends.cudnn.benchmark=True

parser = argparse.ArgumentParser()
parser.add_argument("--in_dir", default="data/color_input", type=str, help="input folder")
parser.add_argument("--out_dir", default="data/output", type=str, help="output folder")
parser.add_argument("--gpu", default=DeviceId.CPU, type=DeviceId.argparse, choices=list(DeviceId))
parser.add_argument("--render_factor", default=21, type=int, help="colorization render factor")

args = parser.parse_args()
in_dir = args.in_dir
out_dir = args.out_dir
gpu = args.gpu
render_factor = args.render_factor

os.makedirs(out_dir, exist_ok=True)

device.set(device=gpu)

import fastai
from deoldify.visualize import *
from PIL import Image


image_names = [f for f in os.listdir(in_dir) if os.path.isfile(os.path.join(in_dir, f))]


colorizer = get_image_colorizer(artistic=False)
for image_name in image_names:
    img = colorizer.get_transformed_image(os.path.join(in_dir, image_name), render_factor=render_factor)
    img.save(os.path.join(out_dir, image_name))


