from ariadne import InterfaceType

media = InterfaceType("Media")


@media.type_resolver
def resolve_search_result_type(obj, *_):
    return "Photo"
