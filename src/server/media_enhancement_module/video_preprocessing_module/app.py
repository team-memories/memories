import subprocess

from flask import Flask, request

app = Flask(__name__)


def extract_thumbnail(file_in_path, thumbnail_out_path):
    subprocess.run(['ffmpeg', '-i', file_in_path, '-ss', '00:00:00.000', '-vframes', '1', thumbnail_out_path])


def preprocess(file_in_path, frames_folder_out_path, thumbnail_out_path, fps_out_path):
    subprocess.run(f"mkdir -p {frames_folder_out_path}", shell=True)
    extract_thumbnail(file_in_path, thumbnail_out_path)
    subprocess.run(f"""
    ffmpeg -i {file_in_path} 2>&1 | grep -o '[0-9]\\{{1,3\\}}\\sfps'| sed 's/\\sfps//' > {fps_out_path} && \
    ffmpeg -y -i "{file_in_path}" -vf scale=480:270 "{file_in_path}_enhanced/input_scaled.mp4" && \
    ffmpeg -y -i "{file_in_path}_enhanced/input_scaled.mp4" -vf hue=s=0 "{file_in_path}_enhanced/input_bw.mp4"  && \
    ffmpeg -y -i "{file_in_path}_enhanced/input_bw.mp4" -vsync 0 "{frames_folder_out_path}/%06d.png"
    """, shell=True)


@app.route("/v1/preprocess", methods=['POST'])
def enhance():
    param = request.get_json(force=True)
    file_in_path, frames_folder_out_path, thumbnail_out_path, fps_out_path = \
        param["file_in_path"], param["frames_folder_out_path"], param["thumbnail_out_path"], param["fps_out_path"]
    preprocess(file_in_path, frames_folder_out_path, thumbnail_out_path, fps_out_path)
    return {}, 200


app.run(debug=True, port=4201, host="0.0.0.0")
