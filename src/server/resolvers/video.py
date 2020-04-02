from ariadne import ObjectType

video = ObjectType("Video")


@video.field("comments")
def resolve_author(_, __):
    raise NotImplementedError("아직 Video type 의 comments field 는 구현되지 않았습니다.")
