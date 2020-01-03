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

#### Running container
`docker run --name=yc -e YC_GOOGLE_MAPS_KEY=CHANGE_ME -e YC_SECURITY_SECRET=CHANGE_ME -e YC_SESSION_REDIS_HOST=CHANGE_ME -e YC_SESSION_SECRET=CHANGE_ME -p 8000:8000 -d --cpus=1 --memory-reservation=250m --memory=500m --restart unless-stopped avoidwork/youngcappuccino-api:latest`
