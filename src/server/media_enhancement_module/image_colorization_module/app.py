import subprocess

from flask import Flask, request

app = Flask(__name__)


def process(file_in_path, file_out_path):
    subprocess.run(f"python image_colorize.py --in_file {file_in_path} \
            --out_dir {file_out_path} --gpu gpu0")


@app.route("/v1/enhance", methods=['POST'])
def enhance():
    param = request.get_json(force=True)
    file_in_path, file_out_path = param["file_in_path"], param["file_out_path"]
    process(file_in_path, file_out_path)
    return {}, 200


app.run(debug=True, port=4102, host="0.0.0.0")
