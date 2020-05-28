import argparse
import os
import subprocess
import sys
sys.path.append('..')
from pathlib import Path
from pytorch_pwc.utils import get_names


def extract_video_frames(input_path):
    path = Path(input_path)

    frames_dir = os.path.join(path.parent, "frames")
    # Make a folder for the frames, if the folder does not already exist
    os.makedirs(frames_dir, exist_ok=True)

    subprocess.run(
        [
            "ffmpeg",
            "-i",
            "{}".format(path.as_posix()),
            "{}".format(
                Path(os.path.join(frames_dir, path.stem + "_%06d.jpg")).as_posix()
            ),
        ]
    )


def parse_args(args):
    arg_parser = argparse.ArgumentParser()
    arg_parser.add_argument(
        "--input-path",
        dest="input_path",
        help="Path to an MP4 video file",
        type=str,
        required=True,
    )
    return arg_parser.parse_args(args)


if __name__ == "__main__":
    args = parse_args(sys.argv[1:])
    files = get_names(args.input_path)
    for file in files:
        extract_video_frames(file)
