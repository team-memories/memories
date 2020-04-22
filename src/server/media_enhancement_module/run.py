import sys
import os
import subprocess
from shutil import rmtree


# Todo(yun-kwak): Refactoring

def run_colorization():
    os.system(f"""
    conda activate color && \
    python colorization/main_woflow_up.py --model colorization/ckpt_woflow \
    --use_gpu 0 --test_dir data/color_input --out_dir data/SR_input/
    """)


def run_image_sr():
    os.system(f"""
    conda activate imagesr && \
    python Image_SR/image_sr.py --test_dir data/SR_input/ --out_dir data/SR_output/
    """)


def run_video_VFI_SR():
    os.system(f"""
    conda activate zooming-slow-mo && \
    cd Zooming-Slow-Mo-CVPR-2020/codes && \
    python frames_to_video.py --model ../experiments/pretrained_models/xiang2020zooming.pth \
        --input ../../data/VFI_input \
        --output ../../data/output.mp4 --fps 60 --N_out 2
    """)


def resize_video(scale="480:270"):
    os.system(f"""
    conda activate color && \
    ffmpeg -i "data/input_preprocessed.mp4" -vf scale={scale} "data/input_preprocessed.mp4" && \
    """)


def convert_video_to_frames():
    os.system(f"""
    conda activate color && \
    ffmpeg -i "data/input_preprocessed.mp4" -vsync 0 "data/color_input/%06d.png" && \
    """)


def convert_video_black_and_white():
    os.system(f"""
    conda activate color && \
    ffmpeg -i input_preprocessed.mp4 -vf hue=s=0 input_preprocessed.mp4
    """)


def get_frame_rate(filename):
    if not os.path.exists(filename):
        sys.stderr.write("ERROR: filename %r was not found!" % (filename,))
        return -1
    out = subprocess.check_output(
        ["ffprobe", filename, "-v", "0", "-select_streams", "v", "-print_format", "flat", "-show_entries",
         "stream=r_frame_rate"])
    rate = out.split('=')[1].strip()[1:-1].split('/')
    if len(rate) == 1:
        return float(rate[0])
    if len(rate) == 2:
        return float(rate[0]) / float(rate[1])
    return -1


def run_image_quality_enhancement():
    os.system("source color.sh")
    os.system("run_image_sr.sh")


def run_video_quality_enhancement():
    # Pre-processing
    frame_rate = get_frame_rate("data/input.mp4")
    os.system("cp data/input.mp4 data/input_preprocessed.mp4")
    resize_video("480:270")
    convert_video_black_and_white()
    convert_video_to_frames()

    # Input => Colorization => Zooming Slow-mo => Output
    run_colorization()
    run_video_VFI_SR()

    # Clean up
    rmtree("data/color_input")
    rmtree("data/VFI_input")
