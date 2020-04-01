from ariadne import ObjectType

video = ObjectType("Video")


@video.field("author")
def resolve_author(_, __):
    raise NotImplementedError("아직 Video type 의 author field 는  구현되지 않았습니다.")


@video.field("comments")
def resolve_author(_, __):
    raise NotImplementedError("아직 Video type 의 comments field 는 구현되지 않았습니다.")
