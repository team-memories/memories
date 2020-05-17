FROM node:12
WORKDIR /app
COPY . .
RUN npm install

# TODO(yun-kwak): 폴더 분리
COPY . .
#########################

EXPOSE 4000
CMD [ "node", "index.js" ]

