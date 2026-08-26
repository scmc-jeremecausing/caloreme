## 1. Django Backend

- [x] 1.1 Create the Django project, dependency metadata, and SQLite configuration — verify with `python manage.py check`.
- [x] 1.2 Add the Graphene-Django schema, `/graphql` route, and `health` resolver — verify with the backend GraphQL test.
- [x] 1.3 Configure an environment-driven local CORS allowlist — verify the configured Vite origin receives the expected CORS response headers.

## 2. React Frontend

- [x] 2.1 Create the Vite React and TypeScript project with Chakra UI and test tooling — verify with `npm run build`.
- [x] 2.2 Add the typed GraphQL request helper and environment-configurable endpoint — verify success and invalid-response tests pass.
- [x] 2.3 Build the Chakra UI health page with loading, healthy, and unavailable states — verify the frontend component tests pass.

## 3. Project Documentation

- [x] 3.1 Update `.gitignore` for Python, SQLite, Node, build, and test artifacts — verify generated local artifacts are ignored.
- [x] 3.2 Document installation, migration, test, and local run commands in `README.md` — verify a new developer can follow the documented workflow.

## 4. Integration Verification

- [x] 4.1 Run backend tests, frontend tests, and the frontend production build — verify all commands complete successfully.
- [x] 4.2 Run both development applications and query the health flow — verify the page displays `API status: OK`.
