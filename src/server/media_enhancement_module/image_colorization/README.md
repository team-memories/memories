
# DeOldify

### Citation
원본 github : https://github.com/jantic/DeOldify

### Prepare:

```
conda env create -f environment.yml

# image model
mkdir models
wget https://www.dropbox.com/s/mwjep3vyqk5mkjc/ColorizeStable_gen.pth?dl=0 -O ./models/ColorizeStable_gen.pth

# video model
wget https://www.dropbox.com/s/336vn9y4qwyg9yz/ColorizeVideo_gen.pth?dl=0 -O ./models/ColorizeVideo_gen.pth

wget https://media.githubusercontent.com/media/jantic/DeOldify/master/resource_images/watermark.png -O ./resource_images/watermark.png

```

### Inference
```
# image colorize
python image_colorize.py --in_dir [directory path including image file] --out_dir [output diretory path]

# video colorize
python video_colorize.py --in_dir [directory path including video file] --out_dir [output directory path]

```

**video output**
in_dir/video.aac - 원본 비디오 소리 추출한 파일
output_dir/bwframes - 원본 frame 저장한 directory
output_dir/colorframes - colorized frame 저장한 directory





Follow [#DeOldify](https://twitter.com/search?q=%23Deoldify) or [Jason Antic](https://twitter.com/citnaj) on Twitter.

## License

All code in this repository is under the MIT license as specified by the LICENSE file.

The model weights listed in this readme under the "Pretrained Weights" section are trained by ourselves and are released under the MIT license.
