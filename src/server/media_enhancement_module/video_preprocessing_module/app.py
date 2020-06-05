import subprocess
import os
from flask import Flask, request
from PIL import Image, ImageStat
from functools import reduce

app = Flask(__name__)


def check_color(file_in_path):
    MONOCHROMATIC_MAX_VARIANCE = 0.005
    COLOR = 1000
    MAYBE_COLOR = 400
    is_color = True
    v = ImageStat.Stat(Image.open(file_in_path)).var
    is_monochromatic = reduce(lambda x, y: x and y < MONOCHROMATIC_MAX_VARIANCE, v, True)
    if is_monochromatic:
        is_color = False
    else:
        if len(v) == 3:
            maxmin = abs(max(v) - min(v))
            if maxmin > COLOR or maxmin > MAYBE_COLOR:
                is_color = False

    return is_color


def check_image_SR(file_in_path):
    image = Image.open(file_in_path)
    is_sr = True
    if (image.size[0]>=720 and image.size[1]>=1280) or (image.size[0]>=1280 and image.size[1]>=720):
        is_sr = False

    return is_sr


def check_video_SR(file_in_path):
    image = Image.open(file_in_path)
    is_sr = True
    if (image.size[0]>=480 and image.size[1]>=720) or (image.size[0]>=720 and image.size[1]>=480):
        is_sr = False

    return is_sr


def check_file_size(file_in_path):
    size_error = False
    output = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', 
                        '-of', 'default=noprint_wrappers=1:nokey=1', file_in_path], stdout=subprocess.PIPE)
    output = output.stdout.splitlines()
    duration = float(output[0])
    if duration > 60.0:
        size_error = True
    return size_error


def video_to_frame(file_in_path, frames_folder_out_path):
    os.makedirs(frames_folder_out_path, exist_ok=True)
    subprocess.run(["ffmpeg", "-i", file_in_path, os.path.join(frames_folder_out_path, "%05d.png"), "-y"])


def frame_to_video(folder_in_path, file_out_path, fps_in_path, audio_file_path):
    fps = open(fps_in_path).readline()
    if os.path.isfile(audio_file_path):
        subprocess.run(['ffmpeg', '-r', fps, '-f', 'image2', '-i', os.path.join(folder_in_path,'%05d.png'),
                     '-i', audio_file_path, '-vcodec', 'libx264', '-acodec', 'aac', file_out_path, '-y'])
    else:
        subprocess.run(['ffmpeg', '-r', fps, '-f', 'image2', '-i', os.path.join(folder_in_path,'%05d.png'),
                     '-vcodec', 'libx264', '-acodec', 'aac', file_out_path, '-y'])


def video_preprocess(file_in_path, thumbnail_out_path, fps_out_path):
    subprocess.run(['ffmpeg', '-i', file_in_path, '-ss', '00:00:00.000', '-vframes', '1', thumbnail_out_path, '-y'])
    subprocess.run(f"""ffmpeg -i {file_in_path} 2>&1 | sed -n "s/.*, \\(.*\\) fp.*/\\1/p" > {fps_out_path}""",
                   shell=True)
    # audia 추출
    filename, ext = os.path.splitext(file_in_path)
    audio_file_path = filename + '.aac'
    if os.path.isfile(audio_file_path):
        os.unlink(audio_file_path)

    os.system(
        'ffmpeg -y -i "'
        + str(file_in_path)
        + '" -vn -acodec copy "'
        + str(audio_file_path)
        + '"'
    )

    size_error = check_file_size(file_in_path)
    is_color = check_color(thumbnail_out_path)
    is_sr = check_video_SR(thumbnail_out_path)

    return size_error, is_color, is_sr, audio_file_path


def image_preprocess(file_in_path):
    is_color = check_color(file_in_path)
    is_sr = check_image_SR(file_in_path)
    return is_color, is_sr


@app.route("/v1/videopreprocess", methods=['POST'])
def enhance():
    param = request.get_json(force=True)
    file_in_path, thumbnail_out_path, fps_out_path, frames_folder_out_path = \
        param["file_in_path"], param["thumbnail_out_path"], param["fps_out_path"], param["frames_folder_out_path"]
    size_error, is_color, is_sr, audio_file_path = video_preprocess(file_in_path, thumbnail_out_path, fps_out_path)
    if is_color is False:
        video_to_frame(file_in_path, frames_folder_out_path)

    return {"size_error": size_error, "is_color": is_color, "is_sr": is_sr,
    "audio_file_path": audio_file_path}, 200

@app.route("/v1/videopostprocess", methods=['POST'])
def video_postprocess():
    param = request.get_json(force=True)
    folder_in_path, file_out_path, fps_in_path, audio_file_path = \
        param["folder_in_path"], param["file_out_path"], param["fps_in_path"], param["audio_file_path"]
    frame_to_video(folder_in_path, file_out_path, fps_in_path, audio_file_path)



@app.route("/v1/imagepreprocess", methods=['POST'])
def check_image():
    param = request.get_json(force=True)
    file_in_path = param["file_in_path"]
    is_color, is_sr = image_preprocess(file_in_path)
    return {"is_color": is_color,"is_sr": is_sr}, 200


app.run(debug=True, port=4201, host="0.0.0.0")
