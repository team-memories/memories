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

args = parser.parse_args()
in_dir = args.in_dir
out_dir = args.out_dir
gpu = args.gpu
os.makedirs(out_dir, exist_ok=True)

device.set(device=DeviceId.gpu)


if not torch.cuda.is_available():
    print('GPU not available.')

from os import path
import fastai
from deoldify.visualize import *
from pathlib import Path
import argparse


video_names = [f for f in os.listdir(in_dir) if os.path.isfile(os.path.join(in_dir, f))]



colorizer = get_video_colorizer(workfolder=out_dir)
for video_name in video_names:
    colorizer.colorize_from_file_name(os.path.join(in_dir, video_name))


