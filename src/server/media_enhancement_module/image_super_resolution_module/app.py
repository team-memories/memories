from flask import Flask, request, jsonify
import numpy as np
from imageio import imread, imsave
from ISR.models import RDN, RRDN

app = Flask(__name__)


def image_super_resolution(file_in_path, file_out_path):
    rdn = RDN(weights='noise-cancel')
    rrdn = RRDN(weights='gans')
    img = imread(file_in_path)
    lr_img = np.array(img)

    if lr_img.shape[0] >= 360 or lr_img.shape[1] >= 640:
        sr_img = rdn.predict(lr_img)
        print('noise')
    else:
        sr_img = rrdn.predict(lr_img)
        print('gans')

    imsave(file_out_path, sr_img)


@app.route("/v1/enhance", methods=['POST'])
def convert_photo():
    print(request.form)
    param = request.get_json(force=True)
    file_in_path, file_out_path = param["file_in_path"], param["file_out_path"]
    image_super_resolution(file_in_path, file_out_path)
    return {}, 200


app.run(port=4103, host='0.0.0.0')
