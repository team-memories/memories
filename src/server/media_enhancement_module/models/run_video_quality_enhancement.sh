#!/usr/bin/env bash
# Pre-processing

# get frame rate
ffmpeg -i data/input.mp4 2>&1 | sed -n "s/.*, \(.*\) fp.*/\1/p" > data/fps

conda activate color && \
ffmpeg -y -i "data/input.mp4" -vf scale=480:270 "data/input_scaled.mp4" && \
ffmpeg -y -i "data/input_scaled.mp4" -vf hue=s=0 "data/input_bw.mp4"  && \
mkdir data/color_input && \
ffmpeg -y -i "data/input_bw.mp4" -vsync 0 "data/color_input/%06d.png"  && \

# Input => Colorization => Zooming Slow-mo => Output
# Colorization
conda activate color && \
python colorization/main_woflow_up.py --model colorization/ckpt_woflow \
--use_gpu 0 --test_dir data/color_input --out_dir data/VFI_input/ && \
conda activate zooming-slow-mo && \
cd Zooming-Slow-Mo-CVPR-2020/codes && \
fps=$(cat ../../data/fps)
fps=$(($fps*2))
python frames_to_video.py --model ../experiments/pretrained_models/xiang2020zooming.pth \
    --input ../../data/VFI_input \
    --output ../../data/output.mp4 --fps $fps  --N_out 3 && \
cd - && \

# Clean up
rm -rf data/color_input && \
rm -rf data/VFI_input

