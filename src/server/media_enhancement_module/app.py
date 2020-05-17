import os

from flask import Flask, request, jsonify
import requests

app = Flask(__name__)
MEDIA_DATA_PATH = "/media_data/"


def preprocess_video(file_in_path, frames_folder_out_path, thumbnail_out_path, fps_out_path):
    url = 'http://localhost:4201/v1/preprocess'
    requests.post(url, json={'file_in_path': file_in_path, 'frames_folder_out_path': frames_folder_out_path,
                             'thumbnail_out_path': thumbnail_out_path, 'fps_out_path': fps_out_path})


def video_colorization(folder_in_path, folder_out_path):
    url = 'http://localhost:4202/v1/enhance'
    requests.post(url, json={'folder_in_path': folder_in_path, 'folder_out_path': folder_out_path})


def super_resolution_and_video_interpolation(folder_in_path, folder_out_path):
    url = 'http://localhost:4203/v1/enhance'
    requests.post(url, json={'folder_in_path': folder_in_path, 'folder_out_path': folder_out_path})


def image_preprocess(file_in_path, file_out_path):
    pass


def image_colorization(file_in_path, file_out_path):
    file_name = os.path.basename(file_in_path)
    os.system(f"mkdir -p {file_in_path}_enhanced/color_input/")
    os.system(f"cp {file_in_path} {file_in_path}_enhanced/color_input/{file_name}")
    folder_in_path = file_in_path + "_enhanced/color_input/"
    folder_out_path = file_in_path + "_enhanced/color_output/"
    video_colorization(folder_in_path, folder_out_path)
    os.system(f"cp {os.path.join(folder_out_path, file_name)} {file_out_path}")


def image_super_resolution(file_in_path, file_out_path):
    url = 'http://localhost:4103/v1/enhance'
    requests.post(url, json={'file_in_path': file_in_path, 'file_out_path': file_out_path})


@app.route('/v1/enhance/video', methods=['POST'])
def enhance_video():
    param = request.get_json(force=True)
    file_name, id = param["file_name"], param["id"]
    file_path = os.path.join(MEDIA_DATA_PATH, file_name)
    enhanced_media_folder_path = file_path + "_enhanced"
    os.system(f"mkdir -p {enhanced_media_folder_path}")

    file_in_path = file_path
    frames_folder_out_path = os.path.join(enhanced_media_folder_path, "frames")
    thumbnail_out_path = os.path.join(enhanced_media_folder_path, "thumbnail.png")
    fps_out_path = os.path.join(enhanced_media_folder_path, "fps")
    preprocess_video(file_in_path, frames_folder_out_path, thumbnail_out_path, fps_out_path)

    folder_in_path = frames_folder_out_path
    folder_out_path = os.path.join(enhanced_media_folder_path, "color")
    video_colorization(folder_in_path, folder_out_path)

    folder_in_path = frames_folder_out_path
    folder_out_path = os.path.join(enhanced_media_folder_path, "color_sr")
    super_resolution_and_video_interpolation(folder_in_path, folder_out_path)

    # file_path와 thumbnail_out_path, file_out_path를 저장


@app.route("/v1/enhance/photo", methods=['POST'])
def enhance_photo():
    param = request.get_json(force=True)
    file_name, id = param["file_name"], param["id"]
    file_path = os.path.join(MEDIA_DATA_PATH, file_name)
    enhanced_media_folder_path = file_path + "_enhanced"
    os.system(f"mkdir -p {enhanced_media_folder_path}")

    # image_preprocess(None, None)

    file_in_path = file_path
    file_out_path = os.path.join(enhanced_media_folder_path, "color_" + file_name)
    image_colorization(file_in_path, file_out_path)

    file_in_path = file_out_path
    file_out_path = os.path.join(enhanced_media_folder_path, "color_sr_" + file_name)
    image_super_resolution(file_in_path, file_out_path)

    # file_path와 file_out_path를 AWS S3에 업로드

    # 변환 완료시 DB에 업데이트


app.run(debug=True, port=4001)
