from PIL import Image 
from os import listdir
from os.path import isfile, join

path = 'data/color_input'

files = [f for f in listdir(path) if isfile(join(path, f))]
for file_name in files:
    image_file = Image.open(join(path, file_name))
    image_file = image_file.convert('1')
    image_file.save(join('data/bnw_original_input',file_name))
