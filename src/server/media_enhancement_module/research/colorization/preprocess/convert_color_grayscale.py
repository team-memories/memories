from PIL import Image
from os import listdir, makedirs
from os.path import isfile, join
import numpy as np
import cv2
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("--input_dir", default='data/scale_video', type=str, help="input data Path")
parser.add_argument("--output_dir", default='data/gray_frames', type=str, help="Path to store output")

args = parser.parse_args()

input_path = args.input_dir
output_path = args.output_dir

os.makedirs(output_path, exist_ok=True)

makedirs('data/korea_gray', exist_ok=True)
files = [f for f in listdir(input_path) if isfile(join(input_path, f))]
for file_name in files:
    image = Image.open(join(input_path, file_name)).convert('L')
    img = np.array(image, 'uint8')
    img = cv2.cvtColor(img, cv2.COLOR_GRAY2RGB)
    cv2.imwrite(join(output_path, file_name), img)
