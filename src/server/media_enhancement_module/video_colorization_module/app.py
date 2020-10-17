import subprocess
from flask import Flask, request
import requests

app = Flask(__name__)


def process(file_in_path, folder_out_path, frames_folder_out_path):
    subprocess.run(f"python video_colorize.py --in_file {file_in_path} \
            --out_dir {folder_out_path} --in_frame_dir {frames_folder_out_path} --gpu gpu0", shell=True)


@app.route("/v1/enhance", methods=['POST'])
def enhance():
    param = request.get_json(force=True)
    file_in_path, folder_out_path, frames_folder_out_path = \
        param["file_in_path"], param["folder_out_path"], param["frames_folder_out_path"]
    process(file_in_path, folder_out_path, frames_folder_out_path)
    return {}, requests.codes.ok


if __name__ == '__main__':
    app.run(port=4202, host="0.0.0.0", threaded=False, processes=1)
