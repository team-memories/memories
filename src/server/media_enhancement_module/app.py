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
    if response.status_code != 200:
        raise RuntimeError("video pre-processing failed")
    response = response.json()
    app.logger.info(response)
    return response['size_error'], response['is_color'], response['is_sr'], response['audio_file_path']


def video_colorization(file_in_path, folder_out_path, frames_folder_out_path):
    url = f'http://{os.environ["VIDEO_COLORIZATION_SERVICE_ADDR"]}/v1/enhance'
    response = requests.post(url, json={'file_in_path': file_in_path, 'folder_out_path': folder_out_path,
                             'frames_folder_out_path': frames_folder_out_path})
    if response.status_code != 200:
        raise RuntimeError("video colorization failed")


def super_resolution_and_video_interpolation(folder_in_path, fps_in_path, file_out_path, audio_file_path):
    url = f'http://{os.environ["VSR_VFI_SERVICE_ADDR"]}/v1/enhance'
    response = requests.post(url, json={'folder_in_path': folder_in_path, 'fps_in_path': fps_in_path,
                             'file_out_path': file_out_path, 'audio_file_path': audio_file_path})
    if response.status_code != 200:
        raise RuntimeError("video sr-vfi failed")


def video_postprocess(folder_in_path, file_out_path, fps_in_path, audio_file_path):
    url = f'http://{os.environ["VIDEO_PREPROCESSING_SERVICE_ADDR"]}/v1/videopostprocess'
    response = requests.post(url, json={'folder_in_path': folder_in_path, 'file_out_path': file_out_path,
                            'fps_in_path': fps_in_path, 'audio_file_path': audio_file_path})
    if response.status_code != 200:
        raise RuntimeError("video post-processing failed")


def preprocess_image(file_in_path):
    url = f'http://{os.environ["VIDEO_PREPROCESSING_SERVICE_ADDR"]}/v1/imagepreprocess'
    response = requests.post(url, json={'file_in_path': file_in_path})
    if response.status_code != 200:
        raise RuntimeError("image pre-processing failed")
    response = response.json()
    app.logger.info(response)
    return response['is_color'], response['is_sr']


def image_colorization(file_in_path, file_out_path):
    url = f"http://{os.environ['IMAGE_COLORIZATION_SERVICE_ADDR']}/v1/enhance"
    response = requests.post(url, json={'file_in_path': file_in_path, 'file_out_path': file_out_path})
    if response.status_code != 200:
        raise RuntimeError("image colorization failed")


def image_super_resolution(file_in_path, file_out_path):
    url = f'http://{os.environ["ISR_SERVICE_ADDR"]}/v1/enhance'
    response = requests.post(url, json={'file_in_path': file_in_path, 'file_out_path': file_out_path})
    if response.status_code != 200:
        raise RuntimeError("Image super-resolution failed")


@app.route('/v1/enhance/video', methods=['POST'])
def enhance_video():
    param = request.get_json(force=True)
    file_name = param["file_name"]
    print(f"Enhancing video: {file_name}")
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
    print(f"Pre-processing video: {file_name}")
    size_error, is_color, is_sr, audio_file_path = preprocess_video(file_in_path, thumbnail_out_path, fps_out_path, frames_folder_out_path)

    # 동영상 긴 경우, error를 내보냄
    # TODO(Lhyejin): size_error일 경우, error를 내보냄
    if size_error:
        pass

    # Colorization 체크
    if is_color:
        print(f"Colorizing video: {file_name}")
        video_colorization(file_in_path, folder_out_path, frames_folder_out_path)
        folder_in_path = folder_out_path
        print(f"Colorized video: {file_name}")
    else:
        # sr input
        folder_in_path = frames_folder_out_path

    fps_in_path = fps_out_path
    file_out_path = os.path.join(enhanced_media_folder_path, "enhanced_" + file_name)
    
    # Super Resolution 체크
    if is_sr:
        print(f"SR-VFI-ing video: {file_name}")
        super_resolution_and_video_interpolation(folder_in_path, fps_in_path, file_out_path, audio_file_path)
        print(f"SR-VFI-ed video: {file_name}")
    else:
        # 동영상으로 만들기
        print(f"Post-processing video: {file_name}")
        video_postprocess(folder_in_path, file_out_path, fps_in_path, audio_file_path)
        print(f"Post-processed video: {file_name}")

    return {"thumbnailFilePath": thumbnail_out_path,
            "originalFilePath": file_path,
            "enhancedFilePath": file_out_path}, 200


@app.route("/v1/enhance/photo", methods=['POST'])
def enhance_photo():
    param = request.get_json(force=True)
    file_name = param["file_name"]
    print(f"Enhancing photo: {file_name}")
    file_path = os.path.join(MEDIA_DATA_PATH, file_name)
    enhanced_media_folder_path = file_path + "_enhanced"
    os.system(f"mkdir -p {enhanced_media_folder_path}")

    file_in_path = file_path
    print(f"Pre-processing photo: {file_name}")
    is_color, is_sr = preprocess_image(file_in_path)

    # Colorization 체크
    if is_color:
        print(f"Colorizing photo: {file_name}")
        file_out_path = os.path.join(enhanced_media_folder_path, "color_" + file_name)
        image_colorization(file_in_path, file_out_path)
        print(f"Colorized photo: {file_out_path}")
    else:
        file_out_path = file_in_path
        
    file_in_path = file_out_path 
    # Super Resolution 체크
    if is_sr:
        print(f"SR-ing photo: {file_name}")
        file_out_path = os.path.join(enhanced_media_folder_path, "color_sr_" + file_name)
        image_super_resolution(file_in_path, file_out_path)
        print(f"SR-ed photo: {file_name}")
    else:
        file_out_path = file_in_path

    return {"originalFilePath": file_path,
            "enhancedFilePath": file_out_path}, 200


app.run(debug=True, port=4001, host="0.0.0.0")
