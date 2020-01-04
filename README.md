# api.youngcappuccino.app
API for Young Cappuccino

### Docker
Login to docker, & pull latest image: `avoidwork/youngcappuccino-api:latest`

#### Environment Variables

```
YC_GOOGLE_MAPS_KEY str
YC_SECURITY_SECRET str
YC_SEED int (optional: 233)
YC_SESSION_REDIS_HOST str
YC_SESSION_REDIS_PORT int (optional: 6379)
YC_SESSION_SECRET str
```

#### Running Container
`docker run --name=yc -e YC_GOOGLE_MAPS_KEY=CHANGEME -e YC_SECURITY_SECRET=CHANGEME -e YC_SESSION_REDIS_HOST=CHANGEME -e YC_SESSION_SECRET=CHANGEME -p 8000:8000 -d --cpus=1 --memory-reservation=128m --memory=256m --restart unless-stopped avoidwork/youngcappuccino-api:latest`

### API Routes
Requests must include an `Origin` header value of `https://youngcappuccino.app` to pass middleware validation (mimic production CORS requests)

#### / (GET)
Returns `["api"]`

#### /api (GET)
Returns `["geo", "search"]`

#### /api/geo (GET)
Returns `maxmind` city lookup by request IP

#### /api/search (GET)
Returns array of search results based on `lat`, `long`, & optional `radius` query string values
