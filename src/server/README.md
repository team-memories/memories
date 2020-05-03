# 설치 방법
1. `mkdir -p $HOME/docker/volumes/postgres`
2. `docker run --rm   --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data  postgres`
