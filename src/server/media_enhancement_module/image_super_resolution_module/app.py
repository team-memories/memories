import subprocess

from flask import Flask, request, jsonify

app = Flask(__name__)


def image_super_resolution(path):
    subprocess.run(f"""
    python Image_SR/image_sr.py --test_dir ${path}/SR_input/ --out_dir ${path}/SR_output/
    """, shell=True)


@app.route("/v1/convert/", methods=['POST'])
def convert_photo():
    param = request.get_json(force=True)
    path = param["path"]
    image_super_resolution(path)


app.run(debug=True, port=4103)
