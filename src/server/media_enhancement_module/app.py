import os

from flask import Flask, request, jsonify
import requests

app = Flask(__name__)
MEDIA_DATA_PATH = "/media_data/"


def preprocess_video(file_in_path, frames_folder_out_path, thumbnail_out_path, fps_out_path):
    url = f'http://{os.environ["VIDEO_PREPROCESSING_SERVICE_ADDR"]}/v1/preprocess'
    requests.post(url, json={'file_in_path': file_in_path, 'frames_folder_out_path': frames_folder_out_path,
                             'thumbnail_out_path': thumbnail_out_path, 'fps_out_path': fps_out_path})


def video_colorization(folder_in_path, folder_out_path):
    url = f'http://{os.environ["VIDEO_COLORIZATION_SERVICE_ADDR"]}/v1/enhance'
    requests.post(url, json={'folder_in_path': folder_in_path, 'folder_out_path': folder_out_path})


def super_resolution_and_video_interpolation(folder_in_path, fps_in_path, file_out_path):
    url = f'http://{os.environ["VSR_VFI_SERVICE_ADDR"]}/v1/enhance'
    requests.post(url, json={'folder_in_path': folder_in_path, 'fps_in_path': fps_in_path,
                             'file_out_path': file_out_path})


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
    url = f'http://{os.environ["ISR_SERVICE_ADDR"]}/v1/enhance'
    requests.post(url, json={'file_in_path': file_in_path, 'file_out_path': file_out_path})


@app.route('/v1/enhance/video', methods=['POST'])
def enhance_video():
    param = request.get_json(force=True)
    file_name = param["file_name"]
    file_path = os.path.join(MEDIA_DATA_PATH, file_name)
    enhanced_media_folder_path = file_path + "_enhanced"
    os.system(f"mkdir -p {enhanced_media_folder_path}")

    # TODO(yun-kwak): 흑백 판단하여 이미 컬러 비디오라면 colorization 건너 뛰게 만들기

    file_in_path = file_path
    frames_folder_out_path = os.path.join(enhanced_media_folder_path, "frames")
    thumbnail_out_path = os.path.join(enhanced_media_folder_path, "thumbnail.png")
    fps_out_path = os.path.join(enhanced_media_folder_path, "fps")
    preprocess_video(file_in_path, frames_folder_out_path, thumbnail_out_path, fps_out_path)

    folder_in_path = frames_folder_out_path
    folder_out_path = os.path.join(enhanced_media_folder_path, "color")
    video_colorization(folder_in_path, folder_out_path)

    folder_in_path = folder_out_path
    fps_in_path = fps_out_path
    file_out_path = os.path.join(enhanced_media_folder_path, "enhanced_" + file_name)
    super_resolution_and_video_interpolation(folder_in_path, fps_in_path, file_out_path)

    return {"thumbnailFilePath": thumbnail_out_path,
            "originalFilePath": os.path.join(enhanced_media_folder_path, "input_bw.mp4"),
            "enhancedFilePath": file_out_path}, 200

    # file_path와 thumbnail_out_path, file_out_path를 저장


@app.route("/v1/enhance/photo", methods=['POST'])
def enhance_photo():
    param = request.get_json(force=True)
    file_name = param["file_name"]
    file_path = os.path.join(MEDIA_DATA_PATH, file_name)
    enhanced_media_folder_path = file_path + "_enhanced"
    os.system(f"mkdir -p {enhanced_media_folder_path}")

    # TODO(yun-kwak): 흑백 판단하여 이미 컬러 사진이면 colorization 건너 뛰게 만들기

    file_in_path = file_path
    file_out_path = os.path.join(enhanced_media_folder_path, "color_" + file_name)
    image_colorization(file_in_path, file_out_path)

    file_in_path = file_out_path
    file_out_path = os.path.join(enhanced_media_folder_path, "color_sr_" + file_name)
    image_super_resolution(file_in_path, file_out_path)

    return {"originalFilePath": file_path,
            "enhancedFilePath": file_out_path}, 200


app.run(debug=True, port=4001, host="0.0.0.0")
