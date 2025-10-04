# Expenses.API — API Documentation & Best Practices

## Purpose

A concise, consistent, and machine-friendly API reference for the Expenses.API service. Use this doc to ensure consistent design, implementation, and consumer expectations.

## Base URL & Versioning

- Base URL (example): https://api.example.com/api/v1
- Use semantic versioning in the path: `/api/v{major}`. Avoid breaking changes in minor/patch releases.

## Authentication & Authorization

- Use JWT Bearer tokens in `Authorization: Bearer <token>`.
- Provide OAuth2/OpenID Connect for token issuance if applicable.
- Document scopes and roles required per endpoint.

## Content Negotiation

- Use `Accept` and `Content-Type` headers.
- Default to `application/json`.
- Support for version negotiation via Accept header is optional, prefer URL versioning.

## Resource Naming & URI Design

- Use plural nouns: `/expenses`, `/users`.
- Hierarchical resources: `/users/{userId}/expenses`.
- Use nouns not verbs; use query parameters for filtering and actions for RPC-like operations.

## HTTP Methods & Status Codes

- GET 200 (or 206 for partial), POST 201, PUT 200/204, PATCH 200, DELETE 204.
- Use 400 for validation errors, 401 unauthorized, 403 forbidden, 404 not found, 409 conflict, 500 server error.

## Request & Response Format

- Use a consistent wrapper for errors:
  {
  "type": "https://example.com/probs/validation",
  "title": "Validation Error",
  "status": 400,
  "detail": "One or more fields are invalid.",
  "errors": {
  "amount": ["Amount must be positive"]
  },
  "instance": "/api/v1/expenses"
  }
- For successful responses return resources or resource lists. Include pagination metadata for collections.

## Pagination, Filtering, Sorting

- Use cursor or page-based pagination. Example page-based:
  GET /expenses?page=2&perPage=25
- Include metadata:
  {
  "items": [...],
  "meta": { "page": 2, "perPage": 25, "total": 345, "totalPages": 14 }
  }
- Filtering: `?startDate=2025-01-01&endDate=2025-01-31&category=travel`
- Sorting: `?sort=-date,amount` (prefix `-` for desc)

## Idempotency & Concurrency

- Use idempotency tokens for non-idempotent operations (Idempotency-Key header) especially for POSTs creating money-related resources.
- Support optimistic concurrency with ETag/If-Match for updates.

## Rate Limiting & Throttling

- Provide rate limit headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`.
- Return 429 with Retry-After header when throttled.

## Caching

- Use `Cache-Control`, `ETag` and `Last-Modified`.
- Only cache safe GET responses.

## Validation & Error Handling

- Validate inputs and return structured errors as shown above.
- Avoid leaking internal details in error messages.

## Security Best Practices

- Enforce TLS.
- Validate and sanitize inputs to prevent injection.
- Use principle of least privilege for service accounts and tokens.
- Rotate secrets and set short-lived tokens.

## Logging, Monitoring & Tracing

- Correlate logs with a request-id passed as `X-Request-Id`.
- Emit structured logs and metrics for latency, errors and throughput.
- Integrate distributed tracing (W3C Trace-Context).

## Documentation & Discoverability

- Provide OpenAPI/Swagger at `/swagger` and a human-friendly docs page.
- Keep examples realistic and include curl snippets and sample responses.

## Testing & CI

- Validate OpenAPI against example responses in CI.
- Include contract tests and smoke tests for critical endpoints.
- Use mock servers for front-end integration tests.

## Change Management & Deprecation

- Announce deprecations with dates and migration guides.
- Support both old and new versions for a deprecation period.

## Example: Expenses Resource

- POST /api/v1/expenses
  Request:
  {
  "date":"2025-09-01",
  "amount": 42.50,
  "currency":"USD",
  "category":"travel",
  "description":"Taxi from airport"
  }
  Response 201 Location: /api/v1/expenses/{id}
  {
  "id": "6f1b...",
  "date":"2025-09-01",
  "amount": 42.50,
  "currency":"USD",
  "category":"travel",
  "description":"Taxi from airport",
  "createdAt":"2025-09-01T12:34:56Z"
  }

- GET /api/v1/expenses?userId=123&page=1&perPage=25
  Response 200: see Pagination section.

## OpenAPI & Machine Readability

- Keep OpenAPI YAML/JSON in repo for generation.
- Use examples in the spec for request/response validation.

## Appendix

- Link to security, deployment, and SDK generation guides.
- Provide contact and support info for API consumers.
