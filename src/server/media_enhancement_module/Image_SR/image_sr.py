import numpy as np
from scipy.misc import imread, imsave
from ISR.models import RDN, RRDN
import argparse
import os
parser = argparse.ArgumentParser()
parser.add_argument("--test_dir", default="../data/VFI_intput/", type=str, 
		     help="Test dir path")
parser.add_argument("--out_dir", default="../data/SR_input", type=str,
                     help="Output dir path")
ARGS = parser.parse_args()

test_dir = ARGS.test_dir
result_path=ARGS.out_dir

old_names = os.popen("ls %s"%test_dir).readlines()
img_names = [None]*len(old_names)
for idx in range(len(old_names)):
    img_names[idx] = test_dir+old_names[idx][:-1]

#rdn = RDN(weights='psnr-large')
rrdn = RRDN(weights='gans')
for img_name in img_names:
    img = imread(img_name)
    lr_img = np.array(img)
    sr_img = rrdn.predict(lr_img)
    base = os.path.basename(img_name)
    img_name = os.path.splitext(base)[0]
    print(img_name)
    if not os.path.exists(result_path):
        os.makedirs(result_path)

    imsave('%s%s.png'%(result_path, img_name) ,sr_img)
