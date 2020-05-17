import subprocess

from flask import Flask, request, jsonify
import requests

app = Flask(__name__)
MEDIA_DATA_PATH = "/media_data/"


def preprocess_video(path):
    url = 'http://localhost:4202/v1/enhance'
    requests.post(url, json={'path': path})
    return True



def video_colorization(path):
    url = 'http://localhost:4202/v1/enhance'
    requests.post(url, json={'path': path})
    return True


def super_resolution_and_video_interpolation(path):
    url = 'http://localhost:4203/v1/enhance'
    requests.post(url, json={'path': path})
    return True


@app.route('/v1/enhance/video', methods=['POST'])
def convert_video():
    param = request.get_json(force=True)
    path, id = param["path"], param["id"]
    preprocess_video(path)
    video_colorization(path)
    super_resolution_and_video_interpolation(path)


def image_preprocess(path):
    os.system(f"mkdir -p {path}/color_input/")
    file_name = os.path.basename(path).replace("_enhanced", "")
    os.system(f"cp {path} {path}/color_input/{file_name}")


def image_colorization(path):
    return video_colorization(path)


def image_super_resolution(path):
    url = 'http://localhost:4103/v1/convert'
    requests.post(url, json={'path': path})
    return True


@app.route("/v1/enhance/photo", methods=['POST'])
def convert_photo():
    param = request.get_json(force=True)
    path, id = param["path"], param["id"]
    file_name = os.path.basename(path)
    enhanced_media_path = MEDIA_DATA_PATH + file_name + "_enhanced"
    os.system(f"mkdir -p {enhanced_media_path}")

    image_preprocess(enhanced_media_path)  # port=4101
    image_colorization(enhanced_media_path)  # port=4202
    image_super_resolution(enhanced_media_path)  # port=4103

    # TODO(yun-kwak): 에러 핸들링

    # S3에 업로드

    # 변환 완료시 DB에 업데이


app.run(debug=True, port=4001)
