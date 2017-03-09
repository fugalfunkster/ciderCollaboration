# RESTful API Design

## Conventions

### Paths

Resource paths always take the form:
```
/api/v1/{pluralizedEntityName}[/{id}]
```
The entity name in a resource path is always pluralized. The id is used for `member` and `update`
methods.

### Body Type

Only `application/json` is supported for request and response bodies.

### Response Body Structure

Responses that include a single entity (e.g. `member`, `create`, `update`) will take the following
form:

``` json
{
  "metadata": {},
  "singularEntityName": entity
}

where entity is an object containing the entity's state, and metadata's properties, if any, will be
defined by the resource.
```

Responses that include potentially many entities (e.g. `collection`) will take the following
form:

``` json
{
  "metadata": {
    "offset": number,
    "limit": number
  },
  "singularEntityName": entities
}

where entities is an array of objects, each of which containing a single entity's state.
```

## Methods

### Member (GET)

A `member` request retrieves an existing entity by `id`. If the entity is found and the requester is
authorized to view the entity, the request returns with HTTP status 200 and the entity with the
given `id`. HTTP status 404 is returned if the entity does not exist (or if the requester is not
allowed to know whether the entity exists), and status 403 is returned if the requester is not
allowed to view the entity.

A `member` request must include an `id` path parameter.

### Collection (GET)

A `collection` request returns zero or more entities, possibly filtered by some criteria expressed
via query parameters. Pagination may be supported via `offset` and `limit` query parameters. HTTP
response status 200 is normal. Status 400 indicates a problem with the query parameters and status
403 indicates insufficient permissions.

A `collection` request never includes an `id` path parameter

### Create (POST)

A 'create' request stores a new entity. The response will include the entity as stored if
successful. Possible HTTP statuses include 201 (created), 400 (bad request), 403 (forbidden) and
409 (conflict with existing entity, such as a unique key constraint violation).

A `create` request never includes an `id` path parameter. The request body gives the entity state
to be persisted.

### Update (PUT)

An 'update' request merges the data provided in the request body over the data stored in the
database. The response will include the entity as stored after the request if successful. Possible
HTTP statuses include 202 (accepted), 400 (bad request), 403 (forbidden) and
409 (conflict with existing entity, such as a unique key constraint violation).

Updates are performed as shallow merges. For fictitious example (in pseudocode):
```
POST { name: 'Greyhound', type: `animal`, properties: { color: 'gray' } }
=> { id: 1, name: 'Greyhound', properties: { color: 'gray' } }

PUT 1: { type: 'dog', properties: { speed: 200 } }
=> { id: 1, name: 'Greyhound', type: 'dog', properties: { speed: 200 } }
```

Note that `name` was unchanged, `type` was updated, and the entire `properties` object was replaced
with the new `properties` object. Most importantly, note that nested properties (`color`) were not
merged.

An `update` request must include an `id` path parameter. The request body gives the entity state
to be persisted.

### Delete (DELETE)

A 'delete' request permanently removes an entity. The response body will be empty. The HTTP response
code may 204 (no content), 400 (bad request), 403 (forbidden) or 409 (if the entity cannot be
removed due to current model state).

A `delete` request must include an `id` path parameter. The request body, if any, is ignored.
