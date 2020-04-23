from ariadne import MutationType
from mock_data import DB
import os

mutation = MutationType()


@mutation.field("uploadMedia")
def resolve_upload_media(_, __, media, title, location, year):
    file_path = f"./{media.filename}"
    media.save(file_path)
    media.close()

    photos = DB["photos"]
    photo = {
        "id": photos[-1]["id"] + 1,
        "description": "No Description",
        "url": f"file://{os.path.abspath(file_path)}",
        "title": title,
        "location": location,
        "is_processing": True,
        "author": {
            "id": 1,
            "email": "rev1c0sm0s@gmail.com",
            "name": "YunHyeok Kwak",
            "profile_img_url": "https://avatars2.githubusercontent.com/u/29162801?s=80&v=4",
        },
        "year": year,
    }
    photos.append(photo)

    DB["photos"] = photos

    return photo


@mutation.field("deleteMedia")
def resolve_delete_media(_, __, _id):
    photos = DB["photos"]

    photo_idx = -1

    for i, ___ in enumerate(photos):
        if photos[i]["id"] == int(_id):
            photo_idx = i
            break
    else:
        raise ValueError("해당 id를 가진 미디어가 존재하지 않습니다.")

    if photos[photo_idx]["url"].find("file://") != -1:
        os.remove(photos[photo_idx]["url"].replace("file://", ""))
    photo = photos[photo_idx]

    photos.pop(photo_idx)
    DB["photos"] = photos

    return photo
