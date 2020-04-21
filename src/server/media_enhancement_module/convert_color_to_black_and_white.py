from PIL import Image
from os import listdir
from os.path import isfile, join

path = 'data/color_input'

files = [f for f in listdir(path) if isfile(join(path, f))]
for file_name in files:
    image = Image.open(join(path, file_name)).conver('LA')
    image.save(join('data/bnw_original_input', file_name))
