from ariadne import ObjectType

query = ObjectType("Query")


@query.field("media")
def resolve_media(_, info, _id):
    db: dict = info.context["db"]
    videos: dict = db["videos"]

    return videos[id]
