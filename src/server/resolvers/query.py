from ariadne import QueryType, convert_kwargs_to_snake_case
from mock_data import DB

query = QueryType()


@query.field("media")
def resolve_media(_, __, _id):
    videos: list = list(filter(lambda v: v["id"] == int(_id), DB["videos"]))
    if len(videos) == 0:
        raise ValueError("해당 id를 가진 미디어가 존재하지 않습니다.")
    video = videos[0]
    return video


@convert_kwargs_to_snake_case
@query.field("search")
def resolve_search(
        _,
        info,
        title: str = "",
        location: str = "대한민국",
        date_from="1900-01-01",
        date_to="2099-12-31",
):
    videos = DB["videos"]
    videos = filter(lambda video: video["title"].find(title) != -1, videos)
    videos = filter(lambda video: video["location"].find(location) != -1, videos)

    # TODO(yun-kwak): 날짜 기반 필터링 구현

    return videos
