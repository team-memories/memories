from deoldify import device
from deoldify.device_id import DeviceId
#choices:  CPU, GPU0...GPU7
device.set(device=DeviceId.GPU0)

import torch

if not torch.cuda.is_available():
    print('GPU not available.')

from os import path
import fastai
from deoldify.visualize import *
from pathlib import Path
import argparse

torch.backends.cudnn.benchmark=True

parser = argparse.ArgumentParser()
parser.add_argument("--in_dir", default="data/color_input", type=str, help="input folder")
parser.add_argument("--out_dir", default="data/output", type=str, help="output folder")
args = parser.parse_args()
in_dir = args.in_dir
out_dir = args.out_dir
os.makedirs(out_dir, exist_ok=True)

video_names = [f for f in os.listdir(in_dir) if os.path.isfile(os.path.join(in_dir, f))]



colorizer = get_video_colorizer(workfolder=out_dir)
for video_name in video_names:
    colorizer.colorize_from_file_name(os.path.join(in_dir, video_name))


