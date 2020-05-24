import os, cv2, sys
sys.path.append('..')
from pytorch_pwc.utils import get_names

img_dir = 'data/Imagenet/val_256/'
image_names = get_names(img_dir)

for i,image_name in enumerate(image_names):
    img = cv2.imread(image_name)
    name = os.path.basename(image_name)
    if i % 1000 == 0:
        print(os.path.join(img_dir, '%08d.jpg'%i))
    cv2.imwrite(os.path.join(img_dir, '%08d.jpg'%i), img)
