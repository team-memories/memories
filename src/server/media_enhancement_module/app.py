import os

from flask import Flask, request, jsonify
import requests

app = Flask(__name__)
MEDIA_DATA_PATH = "/media_data/"


def preprocess_video(file_in_path, thumbnail_out_path, fps_out_path, frames_folder_out_path):
    url = f'http://{os.environ["VIDEO_PREPROCESSING_SERVICE_ADDR"]}/v1/videopreprocess'
    response = requests.post(url, json={'file_in_path': file_in_path,
                            'thumbnail_out_path': thumbnail_out_path, 'fps_out_path': fps_out_path,
                            'frames_folder_out_path': frames_folder_out_path})

    return response.data['size_error'], response.data['is_color'], response.data['is_sr']


def video_colorization(file_in_path, folder_out_path, frames_folder_out_path):
    url = f'http://{os.environ["VIDEO_COLORIZATION_SERVICE_ADDR"]}/v1/enhance'
    requests.post(url, json={'file_in_path': file_in_path, 'folder_out_path': folder_out_path,
                             'frames_folder_out_path': frames_folder_out_path})


def super_resolution_and_video_interpolation(folder_in_path, fps_in_path, file_out_path):
    url = f'http://{os.environ["VSR_VFI_SERVICE_ADDR"]}/v1/enhance'
    requests.post(url, json={'folder_in_path': folder_in_path, 'fps_in_path': fps_in_path,
                             'file_out_path': file_out_path})

def video_postprocess(folder_in_path, file_out_path, fps_in_path):
    url = f'http://{os.environ["VIDEO_PREPROCESSING_SERVICE_ADDR"]}/v1/videopostprocess'
    requests.post(url, json={'folder_in_path': folder_in_path, 'file_out_path': file_out_path,
                            'fps_in_path': fps_in_path})


def preprocess_image(file_in_path):
    url = f'http://{os.environ["VIDEO_PREPROCESSING_SERVICE_ADDR"]}/v1/imagepreprocess'
    response = requests.post(url, json={'file_in_path': file_in_path})

    return response.data['is_color'], response.data['is_sr']


def image_colorization(file_in_path, file_out_path):
    url = f"http://{os.environ['IMAGE_COLORIZATION_SERVICE_ADDR']}/v1/enhance"
    requests.post(url, json={'file_in_path': file_in_path, 'file_out_path': file_out_path})


def image_super_resolution(file_in_path, file_out_path):
    url = f'http://{os.environ["ISR_SERVICE_ADDR"]}/v1/enhance'
    requests.post(url, json={'file_in_path': file_in_path, 'file_out_path': file_out_path})


@app.route('/v1/enhance/video', methods=['POST'])
def enhance_video():
    param = request.get_json(force=True)
    file_name = param["file_name"]
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
    size_error, is_color, is_sr = preprocess_video(file_in_path, thumbnail_out_path, fps_out_path, frames_folder_out_path)

    # 동영상 긴 경우, error를 내보냄
    # TODO(Lhyejin): size_error일 경우, error를 내보냄
    if size_error:
        pass

    # Colorization 체크
    if is_color:
        video_colorization(file_in_path, folder_out_path, frames_folder_out_path)
        folder_in_path = folder_out_path
    else:
        # sr input
        folder_in_path = frames_folder_out_path

    fps_in_path = fps_out_path
    file_out_path = os.path.join(enhanced_media_folder_path, "enhanced_" + file_name)
    
    # Super Resolution 체크
    if is_sr:
        super_resolution_and_video_interpolation(folder_in_path, fps_in_path, file_out_path)
    else:
        # 동영상으로 만들기
        video_postprocess(folder_in_path, file_out_path, fps_in_path)

    return {"thumbnailFilePath": thumbnail_out_path,
            "originalFilePath": file_path,
            "enhancedFilePath": file_out_path}, 200


@app.route("/v1/enhance/photo", methods=['POST'])
def enhance_photo():
    param = request.get_json(force=True)
    file_name = param["file_name"]
    file_path = os.path.join(MEDIA_DATA_PATH, file_name)
    enhanced_media_folder_path = file_path + "_enhanced"
    os.system(f"mkdir -p {enhanced_media_folder_path}")

    file_in_path = file_path
    is_color, is_sr = preprocess_image(file_in_path)

    # Colorization 체크
    if is_color:
        file_out_path = os.path.join(enhanced_media_folder_path, "color_" + file_name)
        image_colorization(file_in_path, file_out_path)
    else:
        file_out_path = file_in_path
    
    # Super Resolution 체크
    if is_sr:
        file_in_path = file_out_path
        file_out_path = os.path.join(enhanced_media_folder_path, "color_sr_" + file_name)
        image_super_resolution(file_in_path, file_out_path)
    else:
        file_out_path = file_in_path
    return {"originalFilePath": file_path,
            "enhancedFilePath": file_out_path}, 200


app.run(debug=True, port=4001, host="0.0.0.0")
