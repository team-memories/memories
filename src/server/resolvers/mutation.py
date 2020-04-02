from ariadne import MutationType
from mock_data import DB
import os

mutation = MutationType()


@mutation.field("uploadMedia")
def resolve_upload_media(_, __, media, title, location, date):
    file_path = f"./{media.filename}"
    media.save(file_path)
    media.close()

    videos = DB["videos"]
    video = {
        "id": len(videos),
        "description": "No Description",
        "url": f"file://{os.path.abspath(file_path)}",
        "title": title,
        "location": location,
        "date": date,
    }
    videos.append(video)

    DB["videos"] = videos

    return video
