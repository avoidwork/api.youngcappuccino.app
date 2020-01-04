# api.youngcappuccino.app
API for Young Cappuccino

### Docker
Login to docker, & pull latest image: `avoidwork/youngcappuccino-api:latest`

#### Environment Variables

```
YC_GOOGLE_MAPS_KEY ""
YC_SECURITY_SECRET ""
YC_SESSION_REDIS_HOST ""
YC_SESSION_SECRET ""
```

#### Running Container
`docker run --name=yc -e YC_GOOGLE_MAPS_KEY=CHANGE_ME -e YC_SECURITY_SECRET=CHANGE_ME -e YC_SESSION_REDIS_HOST=CHANGE_ME -e YC_SESSION_SECRET=CHANGE_ME -p 8000:8000 -d --cpus=1 --memory-reservation=250m --memory=500m --restart unless-stopped avoidwork/youngcappuccino-api:latest`

### API Routes
#### / (GET)
Returns `["api"]`

#### /api (GET)
Returns `["geo", "search"]`

#### /api/geo (GET)
Returns `maxmind` city lookup by request IP

#### /api/search (GET)
Returns array of search results based on `lat`, `long`, & optional `radius` query string values
