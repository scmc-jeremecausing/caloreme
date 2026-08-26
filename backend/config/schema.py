"""Root GraphQL schema for the Caloreme backend."""

from graphene import ObjectType, Schema, String


class Query(ObjectType):
    health = String(required=True, description="Returns the current service status.")

    @staticmethod
    def resolve_health(root: object, info: object) -> str:
        return "OK"


schema = Schema(query=Query)
