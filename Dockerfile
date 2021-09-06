# syntax=docker/dockerfile:1
FROM node:14
LABEL maintainer="isabharon@gmail.com"
WORKDIR /code
COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json
RUN npm install --production
COPY . /code/
CMD ["node", "index.js"]
