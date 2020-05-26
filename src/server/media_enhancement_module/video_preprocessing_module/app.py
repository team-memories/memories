import subprocess

from flask import Flask, request

app = Flask(__name__)


def preprocess(file_in_path, thumbnail_out_path, fps_out_path):
    subprocess.run(['ffmpeg', '-i', file_in_path, '-ss', '00:00:00.000', '-vframes', '1', thumbnail_out_path])
    subprocess.run(f"""ffmpeg -i {file_in_path} 2>&1 | sed -n "s/.*, \\(.*\\) fp.*/\\1/p" > {fps_out_path}""",
                   shell=True)


@app.route("/v1/preprocess", methods=['POST'])
def enhance():
    param = request.get_json(force=True)
    file_in_path, thumbnail_out_path, fps_out_path = \
        param["file_in_path"], param["thumbnail_out_path"], param["fps_out_path"]
    preprocess(file_in_path, thumbnail_out_path, fps_out_path)
    return {}, 200


app.run(debug=True, port=4201, host="0.0.0.0")
