import argparse
import os
import subprocess
import sys
sys.path.append('..')
from pathlib import Path
from pytorch_pwc.utils import get_names
# scale video에 저장


def extract_video_frames(input_path, index, args):
    path = Path(input_path)

    # Make a folder for the frames, if the folder does not already exist
    os.makedirs(args.output_path, exist_ok=True)

    subprocess.run(
        [
            "ffmpeg",
            "-i",
            "{}".format(path.as_posix()),
            "-vf",
            "scale=832:480",
            "{}".format(
                Path(os.path.join(args.output_path, "{:03}.mp4").format(index))
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
    ar_parser.add_argument("--output-path", default="data/scale_video", type=str, help "Path to output")
    return arg_parser.parse_args(args)


if __name__ == "__main__":
    args = parse_args(sys.argv[1:])
    files = get_names(args.input_path)
    for i, file in enumerate(files):
        extract_video_frames(file,i,args)
