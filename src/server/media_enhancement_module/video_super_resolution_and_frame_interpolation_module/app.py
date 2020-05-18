import subprocess

from flask import Flask, request, jsonify

app = Flask(__name__)


def zooming_slow_mo(folder_in_path, fps_in_path, file_out_path):
    fps = int(open(fps_in_path).readline())
    subprocess.run(f"""
    cd Zooming-Slow-Mo-CVPR-2020/codes && \
    python frames_to_video.py --model ../experiments/pretrained_models/xiang2020zooming.pth \
    --input {folder_in_path} \
    --output {file_out_path} --fps {fps*2}  --N_out 3
    """, shell=True)


@app.route("/v1/enhance", methods=['POST'])
def convert_photo():
    param = request.get_json(force=True)
    folder_in_path, fps_in_path, file_out_path = param["folder_in_path"], param["fps_in_path"], param[
        "file_out_path"]
    zooming_slow_mo(folder_in_path, fps_in_path, file_out_path)
    return {}, 200


app.run(debug=True, port=4203, host="0.0.0.0")
