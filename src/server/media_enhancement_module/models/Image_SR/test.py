import numpy as np
from ISR.models import RDN, RRDN
from scipy.misc import imread, imsave

# +
img = imread('test.png')

lr_img = np.array(img)
rdn = RDN(weights='psnr-small')
# rrdn = RRDN(weights='gans')

sr_img = rdn.predict(lr_img)
# gan_img = rrdn.predict(lr_img)

imsave('srsmall_img.png', sr_img)
# imsave('gan_img.png', gan_img)

