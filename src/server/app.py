from ariadne import graphql_sync, make_executable_schema, load_schema_from_path
from ariadne.constants import PLAYGROUND_HTML
from flask import Flask, jsonify

from mock_data import DB
from resolvers.query import query

TYPE_DEFS = load_schema_from_path("schema.graphql")

SCHEMA = make_executable_schema(TYPE_DEFS, query)

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


def context_function(request):
    """
    """
    return {"request": request, "db": DB}


@APP.route("/graphql", methods=["POST"])
def graphql_server():
    from flask import request

    # GraphQL queries are always sent as POST
    data = request.get_json()

    # Note: Passing the request to the context is optional.
    # In Flask, the current request is always accessible as flask.request
    success, result = graphql_sync(
        SCHEMA, data, context_value=context_function, debug=APP.debug
    )

    status_code = 200 if success else 400
    return jsonify(result), status_code


if __name__ == "__main__":
    APP.run(debug=True)
