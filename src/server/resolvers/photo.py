from ariadne import ObjectType

photo = ObjectType("Photo")


@photo.field("comments")
def resolve_comments(_, __):
    raise NotImplementedError("아직 Photo type 의 comments field 는 구현되지 않았습니다.")
