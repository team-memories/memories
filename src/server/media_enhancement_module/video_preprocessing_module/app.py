import subprocess
import os

from flask import Flask, request

app = Flask(__name__)


def extract_thumbnail(video_in_path, thumbnail_out_path):

    subprocess.run(['ffmpeg', '-i', video_in_path, '-ss', '00:00:00.000', '-vframes', '1', thumbnail_out_path])

def preprocess(path):
    extract_thumbnail(path)
    subprocess.run(f"""
    ffmpeg -i {path} 2>&1 | sed -n "s/.*, \(.*\) fp.*/\1/p" > {path}.fps
    source activate color && \
    ffmpeg -y -i "{path}" -vf scale=480:270 "{path}_input_scaled.mp4" && \
    ffmpeg -y -i "{path}_input_scaled.mp4" -vf hue=s=0 "{path}_input_bw.mp4"  && \
    mkdir {path}_color_input && \
    ffmpeg -y -i "{path}_input_bw.mp4" -vsync 0 "{path}_color_input/%06d.png"  && \
    source deactivate
    """, shell=True)

@app.route("/v1/preprocess", methods=['POST'])
def enhance():
    param = request.get_json(force=True)
    video_in_path,  = param["video_in_path"], param["video_out_path"]
    preprocess(path)


app.run(debug=True, port=4201)
