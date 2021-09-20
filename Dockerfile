# syntax=docker/dockerfile:1
FROM node:14
LABEL maintainer="isabharon@gmail.com"
RUN npm install -g serve
WORKDIR /code
COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json
RUN npm install
COPY . /code/
RUN npm run build
CMD ["serve", "-s",  "dist"]
