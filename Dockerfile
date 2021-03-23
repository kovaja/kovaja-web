FROM node:14

WORKDIR /usr/src/app

RUN mkdir client
RUN mkdir server

COPY package*.json ./
COPY ./client/package*.json ./client
COPY ./server/package*.json ./server

COPY ./client/dist ./client/dist
COPY ./server/dist ./server/dist

RUN cd client && npm ci
RUN cd server && npm ci

EXPOSE 8000

CMD ["node", "./server/dist/server.js"]
