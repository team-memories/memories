#!/usr/bin/env bash
conda activate color && \
ffmpeg -i "data/input.mp4" -vf scale=480:360 "data/input_shrink.mp4" && \
ffmpeg -i "data/input_shrink.mp4" -vsync 0 "data/color_input/%06d.png" && \
conda activate color && \
source color.sh && \
conda activate zooming-slow-mo && \
cd Zooming-Slow-Mo-CVPR-2020/codes && \
python frames_to_video.py --model ../experiments/pretrained_models/xiang2020zooming.pth \
    --output ../../data/output.mp4 --fps 60 --N_out 2
