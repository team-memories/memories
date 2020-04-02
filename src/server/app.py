import json

from ariadne import (
    graphql_sync,
    snake_case_fallback_resolvers,
    make_executable_schema,
    load_schema_from_path,
    upload_scalar,
    combine_multipart_data,
)
from ariadne.constants import PLAYGROUND_HTML
from flask import Flask, jsonify, request

from resolvers.query import query
from resolvers.mutation import mutation
from resolvers.media import media
from resolvers.video import video

TYPE_DEFS = load_schema_from_path("schema.graphql")

SCHEMA = make_executable_schema(
    TYPE_DEFS,
    query,
    mutation,
    media,
    video,
    upload_scalar,
    snake_case_fallback_resolvers,
)

APP = Flask(__name__)


@APP.route("/graphql", methods=["GET"])
def graphql_playgroud():
    """
    On GET request serve GraphQL Playground
    You don't need to provide Playground if you don't want to
    but keep on mind this will not prohibit clients from
    exploring your API using desktop GraphQL Playground app.
    """

    return PLAYGROUND_HTML, 200


@APP.route("/graphql", methods=["POST"])
def graphql_server():
    # GraphQL queries are always sent as POST
    if request.content_type.startswith("multipart/form-data"):
        data = combine_multipart_data(
            json.loads(request.form.get("operations")),
            json.loads(request.form.get("map")),
            dict(request.files),
        )
    else:
        data = request.get_json()

    # Note: Passing the request to the context is optional.
    # In Flask, the current request is always accessible as flask.request
    success, result = graphql_sync(SCHEMA, data, context_value=request, debug=APP.debug)

    status_code = 200 if success else 400
    return jsonify(result), status_code


if __name__ == "__main__":
    print("GraphQL playground [GET]: http://localhost:9696/graphql")
    print("GraphQL endpoint [POST]: http://localhost:9696/graphql")
    APP.run(debug=True, port=9696)
