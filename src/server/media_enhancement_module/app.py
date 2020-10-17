import os

from flask import Flask, request, jsonify
from logging.config import dictConfig
import requests

dictConfig({
    'version': 1,
    'formatters': {'default': {
        'format': '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
    }},
    'handlers': {'wsgi': {
        'class': 'logging.StreamHandler',
        'formatter': 'default'
    }},
    'root': {
        'level': 'DEBUG',
        'handlers': ['wsgi']
    }
})


app = Flask(__name__)
MEDIA_DATA_PATH = "/media_data/"


def preprocess_video(file_in_path, thumbnail_out_path, fps_out_path, frames_folder_out_path):
    url = f'http://{os.environ["VIDEO_PREPROCESSING_SERVICE_ADDR"]}/v1/videopreprocess'
    response = requests.post(url, json={'file_in_path': file_in_path,
                            'thumbnail_out_path': thumbnail_out_path, 'fps_out_path': fps_out_path,
                            'frames_folder_out_path': frames_folder_out_path})
    if response.status_code != requests.codes.ok:
        raise RuntimeError("video pre-processing failed")
    response = response.json()
    app.logger.info(response)
    return response['size_error'], response['is_color'], response['is_sr'], response['audio_file_path']


def video_colorization(is_color, file_in_path, folder_out_path, frames_folder_out_path, file_name):
    app.logger.info(f"Colorizing video: {file_name}")
    url = f'http://{os.environ["VIDEO_COLORIZATION_SERVICE_ADDR"]}/v1/enhance'
    response = requests.post(url, json={'file_in_path': file_in_path, 'folder_out_path': folder_out_path,
                             'frames_folder_out_path': frames_folder_out_path})
    if response.status_code != requests.codes.ok:
        raise RuntimeError("video colorization failed")
    app.logger.info(f"Colorized video: {file_name}")

    return folder_out_path


def super_resolution_and_video_interpolation(folder_in_path, fps_in_path, file_out_path, audio_file_path, file_name):
    app.logger.info(f"SR-VFI-ing video: {file_name}")
    url = f'http://{os.environ["VSR_VFI_SERVICE_ADDR"]}/v1/enhance'
    response = requests.post(url, json={'folder_in_path': folder_in_path, 'fps_in_path': fps_in_path,
                             'file_out_path': file_out_path, 'audio_file_path': audio_file_path})
    if response.status_code != requests.codes.ok:
        raise RuntimeError("video sr-vfi failed")
    app.logger.info(f"SR-VFI-ed video: {file_name}")


def video_postprocess(folder_in_path, fps_in_path, file_out_path, audio_file_path, file_name):
    app.logger.info(f"Post-processing video: {file_name}")
    url = f'http://{os.environ["VIDEO_PREPROCESSING_SERVICE_ADDR"]}/v1/videopostprocess'
    response = requests.post(url, json={'folder_in_path': folder_in_path, 'file_out_path': file_out_path,
                            'fps_in_path': fps_in_path, 'audio_file_path': audio_file_path})
    if response.status_code != requests.codes.ok:
        raise RuntimeError("video post-processing failed")
    app.logger.info(f"Post-processed video: {file_name}")


def preprocess_image(file_in_path):
    url = f'http://{os.environ["VIDEO_PREPROCESSING_SERVICE_ADDR"]}/v1/imagepreprocess'
    response = requests.post(url, json={'file_in_path': file_in_path})
    if response.status_code != requests.codes.ok:
        raise RuntimeError("image pre-processing failed")
    response = response.json()
    app.logger.info(response)
    return response['is_color'], response['is_sr']


def image_colorization(file_in_path, file_out_path, file_name):
    app.logger.info(f"Colorizing photo: {file_name}")
    file_in_path = os.path.join(enhanced_media_folder_path, "color_" + file_name)
    url = f"http://{os.environ['IMAGE_COLORIZATION_SERVICE_ADDR']}/v1/enhance"
    response = requests.post(url, json={'file_in_path': file_in_path, 'file_out_path': file_out_path})
    if response.status_code != requests.codes.ok:
        raise RuntimeError("image colorization failed")
    app.logger.info(f"Colorized photo: {file_out_path}")


def image_super_resolution(file_in_path, file_out_path, file_name):
    app.logger.info(f"SR-ing photo: {file_name}")
    file_out_path = os.path.join(enhanced_media_folder_path, "color_sr_" + file_name)
    url = f'http://{os.environ["ISR_SERVICE_ADDR"]}/v1/enhance'
    response = requests.post(url, json={'file_in_path': file_in_path, 'file_out_path': file_out_path})
    if response.status_code != requests.codes.ok:
        raise RuntimeError("Image super-resolution failed")
    app.logger.info(f"SR-ed photo: {file_name}")


@app.route('/v1/enhance/video', methods=['POST'])
def enhance_video():
    param = request.get_json(force=True)
    file_name = param["file_name"]
    app.logger.info(f"Enhancing video: {file_name}")
    file_path = os.path.join(MEDIA_DATA_PATH, file_name)
    enhanced_media_folder_path = os.path.join(MEDIA_DATA_PATH, os.path.splitext(file_name)[0] + "_enhanced")
    os.system(f"mkdir -p {enhanced_media_folder_path}")

    file_in_path = file_path
    thumbnail_out_path = os.path.join(enhanced_media_folder_path, "thumbnail.png")
    fps_out_path = os.path.join(enhanced_media_folder_path, "fps")

    # colorization output path 지정
    folder_out_path = os.path.join(enhanced_media_folder_path, "color")
    frames_folder_out_path = os.path.join(enhanced_media_folder_path, "frames")

    # Video Preprocess
    app.logger.info(f"Pre-processing video: {file_name}")
    size_error, is_color, is_sr, audio_file_path = preprocess_video(file_in_path, thumbnail_out_path, fps_out_path, frames_folder_out_path)

    # Colorization 수행
    folder_in_path = video_colorization(file_in_path, folder_out_path, frames_folder_out_path, file_name) if is_color else frames_folder_out_path
    fps_in_path = fps_out_path
    file_out_path = os.path.join(enhanced_media_folder_path, "enhanced_" + file_name)

    # Super Resolution 수행
    sr_argument = (folder_in_path, fps_in_path, file_out_path, audio_file_path, file_name)
    super_resolution_and_video_interpolation(*sr_argument) if is_sr else video_postprocess(*sr_argument)

    return {"thumbnailFilePath": thumbnail_out_path,
            "originalFilePath": file_path,
            "enhancedFilePath": file_out_path,
            "isOriginal": not(is_color or is_sr)}, requests.codes.ok


@app.route("/v1/enhance/photo", methods=['POST'])
def enhance_photo():
    param = request.get_json(force=True)
    file_name = param["file_name"]
    app.logger.info(f"Enhancing photo: {file_name}")
    file_path = os.path.join(MEDIA_DATA_PATH, file_name)
    enhanced_media_folder_path = file_path + "_enhanced"
    os.system(f"mkdir -p {enhanced_media_folder_path}")

    file_in_path = file_path
    app.logger.info(f"Pre-processing photo: {file_name}")
    is_color, is_sr = preprocess_image(file_in_path)

    # Colorization 수행
    file_in_path = image_colorization(file_in_path, file_out_path, file_name) if is_color else file_in_path

    # Super Resolution 수행
    file_out_path = image_super_resolution(file_in_path, file_out_path, file_name) if is_sr else file_in_path

    return {"originalFilePath": file_path,
            "enhancedFilePath": file_out_path, "isOriginal": not(is_color or is_sr)}, requests.codes.ok


app.run(port=4001, host="0.0.0.0")
