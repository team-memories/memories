from deoldify import device
from deoldify.device_id import DeviceId
import torch
import argparse, os
#choices:  CPU, GPU0...GPU7
torch.backends.cudnn.benchmark=True

parser = argparse.ArgumentParser()
parser.add_argument("--in_file", required=True, type=str, help="input file path")
parser.add_argument("--out_dir", required=True, type=str, help="output folder")
parser.add_argument("--in_frame_dir", required=True, type=str, help="input bw frames path")
parser.add_argument("--gpu", default=DeviceId.CPU, type=DeviceId.argparse, choices=list(DeviceId))

args = parser.parse_args()
in_file = args.in_file
out_dir = args.out_dir
in_frame_dir = args.in_frame_dir
gpu = args.gpu
os.makedirs(out_dir, exist_ok=True)

device.set(device=gpu)


if not torch.cuda.is_available():
    print('GPU not available.')

import fastai
from deoldify.visualize import *
from pathlib import Path


colorizer = get_video_colorizer(outfolder=out_dir, input_bw=in_frame_dir)

# video colorize
colorizer.colorize_from_file_name(in_file)


