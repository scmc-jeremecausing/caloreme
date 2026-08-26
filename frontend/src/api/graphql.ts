export const graphqlEndpoint =
  import.meta.env.VITE_GRAPHQL_URL ?? "http://localhost:8000/graphql";

const HEALTH_QUERY = "query Health { health }";

type GraphQLResponse = {
  data?: { health?: unknown };
  errors?: Array<{ message?: string }>;
};

export async function fetchHealth(): Promise<"OK"> {
  const response = await fetch(graphqlEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: HEALTH_QUERY }),
  });

  if (!response.ok) {
    throw new Error("Health request failed");
  }

  const payload = (await response.json()) as GraphQLResponse;
  if (payload.errors || payload.data?.health !== "OK") {
    throw new Error("Health response was invalid");
  }

  return "OK";
}
