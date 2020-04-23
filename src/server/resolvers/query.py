from ariadne import QueryType, convert_kwargs_to_snake_case
from mock_data import DB

query = QueryType()


@query.field("media")
def resolve_media(_, __, _id):
    photos: list = list(filter(lambda v: v["id"] == int(_id), DB["photos"]))
    if len(photos) == 0:
        raise ValueError("해당 id를 가진 미디어가 존재하지 않습니다.")
    photo = photos[0]
    return photo


@query.field("search")
@convert_kwargs_to_snake_case
def resolve_search(
        _,
        info,
        title: str = "",
        location: str = "대한민국",
        year_from=1900,
        year_to=2099,
):
    photos = DB["photos"]
    photos = filter(lambda photo: photo["title"].find(title) != -1, photos)
    photos = filter(lambda photo: photo["location"].find(location) != -1, photos)
    photos = filter(lambda photo: year_from <= photo["year"] <= year_to, photos)

    return photos
