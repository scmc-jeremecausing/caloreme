## Context

The repository has no application source or established runtime conventions. The change spans two independently running applications and must satisfy the behavior in `specs/system-health/spec.md`. See `proposal.md` for motivation.

## Goals / Non-Goals

**Goals:**

- Establish clear `backend/` and `frontend/` boundaries in one repository.
- Keep installation and local execution understandable without container orchestration.
- Make the health request states deterministic and independently testable.
- Leave straightforward extension points for future domain-focused Django apps and React pages.

**Non-Goals:**

- Establish production hosting, containerization, authentication, or CI/CD.
- Add persisted domain data or GraphQL mutations.
- Introduce a comprehensive GraphQL client cache or generated client types.
- Build a reusable component library beyond the initial Chakra UI composition.

## Decisions

### Decision 1: Separate backend and frontend workspaces

Place Django in `backend/` and the Vite application in `frontend/`, with dependency metadata and test commands owned by each workspace. This avoids coupling two toolchains while keeping the repository easy to navigate. A single mixed source tree was rejected because Python and Node tooling have different lifecycle and generated-file conventions.

### Decision 2: Use Graphene-Django for the GraphQL endpoint

Install Graphene-Django, define the root query in the Django project schema, and expose it at `/graphql`. This follows the requested Graphene stack and provides a direct path to per-app schemas later. A REST health endpoint was rejected because it would not verify the selected GraphQL integration.

### Decision 3: Use SQLite through Django's standard database configuration

Keep SQLite as the local database engine and include Django's standard migrations. The health resolver remains side-effect free and does not create a placeholder model. A synthetic health table was rejected because persisted data is unnecessary for service availability and would create misleading domain structure.

### Decision 4: Use native fetch for the initial GraphQL request

Send the health query with a small typed request helper. Configure the endpoint through `VITE_GRAPHQL_URL`, with a documented local default. Apollo or Relay would add cache and code-generation concepts that this single, read-only query does not need.

### Decision 5: Represent loading, healthy, and unavailable states in the page

The React page owns the request lifecycle and renders each state using Chakra UI components. Invalid payloads and network failures converge on the unavailable state, while diagnostic details remain out of the user-facing message.

### Decision 6: Restrict cross-origin access to configured development origins

Use Django CORS middleware with an environment-configurable allowlist that defaults to the local Vite origin in development. Exempt the initial `/graphql` view from CSRF protection because it serves only the public, read-only health query and does not use cookie-based authentication. Allowing every origin was rejected because it would create an unsafe default that could accidentally survive into later environments. Cookie-authenticated or state-changing GraphQL operations require a new security design before they are introduced.

### Decision 7: Test behavior at each application boundary

Use Django's test runner to submit the GraphQL query and assert the response. Use Vitest, Testing Library, and a mocked `fetch` to verify loading, success, and failure states. The documented manual flow provides the integration check without adding browser automation to the initial slice.

## Risks / Trade-offs

- **Independent development servers require coordinated startup** → Document separate backend and frontend commands clearly.
- **Native fetch may become cumbersome as GraphQL usage grows** → Introduce a dedicated client in a later change when caching, mutations, or code generation justify it.
- **Development defaults can leak into deployed environments** → Keep origins and endpoint URLs environment-configurable and document that the defaults are local-only.
- **CSRF exemption could be unsafe if the endpoint later handles authenticated writes** → Keep the current schema read-only and require a security review before adding mutations or cookie authentication.
- **The health query does not verify database reads** → Treat this slice as connectivity scaffolding; add database-backed behavior with the first domain capability.

## Migration Plan

This is a greenfield scaffold, so no data migration or compatibility rollout is required. Apply Django's built-in migrations during local setup. Rollback consists of reverting the newly added application files and dependency metadata.
