FROM node:12
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . .

EXPOSE 4000
CMD [ "node", "index.js" ]

