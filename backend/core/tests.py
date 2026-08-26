import json

from django.test import Client, TestCase


class HealthQueryTests(TestCase):
    def test_health_query_returns_ok_without_errors(self) -> None:
        response = self.client.post(
            "/graphql",
            data=json.dumps({"query": "{ health }"}),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, {"data": {"health": "OK"}})

    def test_graphql_allows_the_configured_vite_origin(self) -> None:
        with self.settings(CORS_ALLOWED_ORIGINS=["http://localhost:5173"]):
            response = self.client.options(
                "/graphql",
                HTTP_ORIGIN="http://localhost:5173",
                HTTP_ACCESS_CONTROL_REQUEST_METHOD="POST",
            )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response["access-control-allow-origin"], "http://localhost:5173"
        )

    def test_health_query_from_vite_origin_is_not_rejected_by_csrf(self) -> None:
        with self.settings(CORS_ALLOWED_ORIGINS=["http://localhost:5173"]):
            response = Client(enforce_csrf_checks=True).post(
                "/graphql",
                data=json.dumps({"query": "{ health }"}),
                content_type="application/json",
                HTTP_ORIGIN="http://localhost:5173",
            )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response["access-control-allow-origin"], "http://localhost:5173"
        )
        self.assertJSONEqual(response.content, {"data": {"health": "OK"}})
