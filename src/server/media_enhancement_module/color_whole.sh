# optical flow 추출 
conda activate pwcnet
cd colorization/pytorch_pwc
python run_data.py --in_dir ../../data/color_input --out_dir ../../data/FLOWImages_GRAY --grayscale
cd ../..

# colorizaiton
conda activate color
cd colorization
# --model parameter path / --test-dir frame 있는 path
python test_main_whole.py --model colorization/whole_model/ --test-dir data/color_input --flow-root-dir data --out_dir  ../data/VFI_input

cd ../



