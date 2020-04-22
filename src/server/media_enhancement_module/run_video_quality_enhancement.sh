source color.sh && \
source run_image_sr.sh

# Pre-processing

# get frame rate
cp data/input.mp4 data/input_preprocessed.mp4 && \
conda activate color && \
ffmpeg -i "data/input_preprocessed.mp4" -vf scale=480:270 "data/input_preprocessed.mp4" && \
ffmpeg -i "data/input_preprocessed.mp4" -vf hue=s=0 "data/input_preprocessed.mp4" && \
ffmpeg -i "data/input_preprocessed.mp4" -vsync 0 "data/color_input/%06d.png" && \

# Input => Colorization => Zooming Slow-mo => Output
# Colorization
python colorization/main_woflow_up.py --model colorization/ckpt_woflow \
--use_gpu 0 --test_dir data/color_input --out_dir data/SR_input/ && \
cd Zooming-Slow-Mo-CVPR-2020/codes && \
python frames_to_video.py --model ../experiments/pretrained_models/xiang2020zooming.pth \
    --input ../../data/VFI_input \
    --output ../../data/output.mp4 --fps 60 --N_out 2 && \
cd - && \

# Clean up
rm -rf data/color_input && \
rm -rf data/VFI_input

