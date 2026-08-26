## Why

The repository needs a runnable application foundation before domain features can be developed. A minimal health-check flow will verify that Django, SQLite, GraphQL, React, and Chakra UI are correctly configured and can communicate end to end.

## What Changes

- Add a Django backend configured with SQLite.
- Expose a GraphQL endpoint using Graphene-Django with a health query.
- Add a React and TypeScript frontend built with Vite.
- Display the backend health result through a Chakra UI page.
- Configure local cross-origin communication.
- Add focused backend and frontend tests.
- Document local setup and run commands.

## Capabilities

### New Capabilities

- `system-health`: Provide and display application health through an end-to-end GraphQL flow.

### Modified Capabilities

None.

## Impact

- `backend/`: New Django, SQLite, and Graphene-Django application.
- `frontend/`: New React, TypeScript, Vite, and Chakra UI application.
- `README.md`: Local installation, test, and run instructions.
- `.gitignore`: Generated Python, Node, test, and SQLite artifacts.
