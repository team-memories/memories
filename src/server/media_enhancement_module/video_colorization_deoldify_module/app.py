import subprocess

from flask import Flask, request

app = Flask(__name__)


def process(folder_in_path, folder_out_path):
    subprocess.run(f"python video_colorize.py --in_dir {folder_in_path} \
            --out_dir {folder_out_path} --gpu gpu0", shell=True)


@app.route("/v1/enhance", methods=['POST'])
def enhance():
    param = request.get_json(force=True)
    print(param)
    folder_in_path, folder_out_path = param["folder_in_path"], param["folder_out_path"]
    process(folder_in_path, folder_out_path)
    return {}, 200


if __name__ == '__main__':
    app.run(port=4202, host="0.0.0.0")
