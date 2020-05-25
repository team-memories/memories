import subprocess

from flask import Flask, request

app = Flask(__name__)


def process(folder_in_path, folder_out_path):
    subprocess.run(f"python video_colorize.py --in_dir {folder_in_path} \
            --out_dir {folder_out_path} --gpu 0")


@app.route("/v1/enhance", methods=['POST'])
def enhance():
    param = request.get_json(force=True)
    folder_in_path, folder_out_path = param["folder_in_path"], param["folder_out_path"]
    try:
        process(folder_in_path, folder_out_path)
    except:
        return {}, 500
    return {}, 200


app.run(debug=True, port=4202, host="0.0.0.0")
