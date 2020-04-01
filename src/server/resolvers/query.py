from ariadne import ObjectType

query = ObjectType("Query")


@query.field("media")
def resolve_media(_, info, id):
    DB = info.context["db"]

    return DB.videos[id]
