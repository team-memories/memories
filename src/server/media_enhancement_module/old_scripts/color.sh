#!/usr/bin/env bash
conda activate color && \
python colorization/main_woflow_up.py --model colorization/ckpt_woflow --use_gpu 0 --test_dir data/color_input --out_dir data/SR_input/
