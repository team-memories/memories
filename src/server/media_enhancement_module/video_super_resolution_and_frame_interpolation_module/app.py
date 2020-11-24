import subprocess

from flask import Flask, request, jsonify
from logging.config import dictConfig

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


def zooming_slow_mo(folder_in_path, fps_in_path, file_out_path, audio_file_path):
    fps = float(open(fps_in_path).readline())
    n_out = 3
    if fps < 60.0:
        fps *= 2
    else:
        n_out = 1
    subprocess.run(f"""
    cd Zooming-Slow-Mo-CVPR-2020/codes && \
    python frames_to_video.py --model ../experiments/pretrained_models/xiang2020zooming.pth \
    --input {folder_in_path} \
    --output {file_out_path} --fps {fps}  --N_out {n_out} --audio {audio_file_path}
    """, shell=True)


@app.route("/v1/enhance", methods=['POST'])
def convert_photo():
    param = request.get_json(force=True)
    folder_in_path, fps_in_path, file_out_path, audio_file_path = param["folder_in_path"], param["fps_in_path"], param[
        "file_out_path"], param['audio_file_path']
    app.logger.info(f"Receive {folder_in_path}, original fps: {float(open(fps_in_path).readline())}")
    zooming_slow_mo(folder_in_path, fps_in_path, file_out_path, audio_file_path)
    return {}, 200


app.run(port=4203, host="0.0.0.0", threaded=False, processes=1)
