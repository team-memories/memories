import subprocess

from flask import Flask, request, jsonify

app = Flask(__name__)


def video_colorization(folder_in_path, folder_out_path):
    subprocess.run(f"python colorization/main_woflow_up.py --model colorization/ckpt_woflow \
    --use_gpu 0 --test_dir {folder_in_path} --out_dir {folder_out_path}", shell=True)


@app.route("/v1/enhance", methods=['POST'])
def enhance():
    param = request.get_json(force=True)
    folder_in_path, folder_out_path = param["folder_in_path"], param["folder_out_path"]
    video_colorization(folder_in_path, folder_out_path)
    return {
        "success": True
    }


app.run(debug=True, port=4202, host="0.0.0.0")
