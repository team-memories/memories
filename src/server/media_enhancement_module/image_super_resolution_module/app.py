import os

from flask import Flask, request, jsonify
import numpy as np
from scipy.misc import imread, imsave
from ISR.models import RDN, RRDN

app = Flask(__name__)


def image_super_resolution(path):
    in_dir = os.path.join(path, "SR_input/")
    result_path = os.path.join(path, "SR_output/")
    print("image_super_resolution was called")
    # image 불러오기 위해서 image path가져오기
    old_names = os.popen("ls %s" % in_dir).readlines()
    img_names = [None] * len(old_names)
    for idx in range(len(old_names)):
        img_names[idx] = in_dir + old_names[idx][:-1]

    rdn = RDN(weights='noise-cancel')
    rrdn = RRDN(weights='gans')
    for img_name in img_names:
        img = imread(img_name)
        lr_img = np.array(img)

        if lr_img.shape[0] >= 360 or lr_img.shape[1] >= 640:
            sr_img = rdn.predict(lr_img)
            print('noise')
        else:
            sr_img = rrdn.predict(lr_img)
            print('gans')

        base = os.path.basename(img_name)
        img_name = os.path.splitext(base)[0]
        if not os.path.exists(result_path):
            os.makedirs(result_path)

        imsave('%s%s.png' % (result_path, img_name), sr_img)


@app.route("/v1/convert", methods=['POST'])
def convert_photo():
    print(request.form)
    param = request.get_json(force=True)
    path = param["path"]
    print(param)
    image_super_resolution(path)


app.run(debug=True, port=4103, host='0.0.0.0')
