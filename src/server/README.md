# 설치 방법
1. Slack 의 general channel 에 배포한 .env 파일의 내용으로 server폴더 안에 .env파일을 만드세요.
1. `mkdir -p $HOME/docker/volumes/postgres`
1. (Docker가 설치되어 있어야 합니다.)`docker run --rm   --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data  postgres`
1. `npm install -D`
1. `docker exec -it pg-docker psql -U postgres -d postgres -c "CREATE DATABASE memories";`
1. `npx knex migrate:latest && npx knex seed:run` (데이터 베이스에 테이블을 생성하고 데이터를 시딩한다. 데이터에 문제가 생겼을 경우 `npx knex migrate:rollback`으로 롤백 가능.)
1. `npm start` or `npm run dev`(Nodemon 사용)
1. NGINX 설정 `docker run --name nginx --rm -p 8080:80 -v $(pwd)/media:/usr/share/nginx/html/media:ro -d nginx`

# TODO
[ ] Dockerfile들 개선 필요. (cuda 기반 이미지로 교체)
[ ] Kubernetes 설정
[ ] Terraform 을 이용해 AWS EKS로 배포.
[ ] GPU inference 설정
[ ] TF serving 등의 서빙 라이브러리 이용 가능한지 검토
[ ] 속도 개선
[ ] 품질 향상 모듈의 각 모듈(Super resolution, ...)이 여전히 highly coupling 되어있다. 개선하자.