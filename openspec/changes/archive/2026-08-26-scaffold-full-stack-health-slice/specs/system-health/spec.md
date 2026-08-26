## Purpose

Provide a minimal, observable health flow that verifies the browser application can communicate with the backend service through GraphQL.

## ADDED Requirements

### Requirement: GraphQL health status

The backend SHALL expose a GraphQL health query that returns the status value `OK` while the service is available.

#### Scenario: Health query succeeds

- **WHEN** a client submits a valid GraphQL health query
- **THEN** the response contains a health value of `OK`
- **AND** the response contains no GraphQL errors

### Requirement: Health status display

The frontend SHALL request the GraphQL health status and display the current request state to the user.

#### Scenario: Health status is loading

- **WHEN** the health request is in progress
- **THEN** the page indicates that the API status is being checked

#### Scenario: Backend reports healthy

- **WHEN** the health request completes with the value `OK`
- **THEN** the page displays `API status: OK`

#### Scenario: Health request fails

- **WHEN** the health request cannot be completed or returns an invalid response
- **THEN** the page displays a clear unavailable status

### Requirement: Local end-to-end health flow

The locally running frontend SHALL be permitted to query the locally running backend GraphQL endpoint.

#### Scenario: Local applications communicate

- **WHEN** both applications are running using the documented local development commands
- **THEN** the frontend health request reaches the backend without a cross-origin access failure
- **AND** the page displays `API status: OK`
