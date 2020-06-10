FROM node:12.16.3-alpine3.11

WORKDIR ./src/App

COPY ./package.json ./

RUN npm install

COPY ./src ./src

RUN npm start

CMD ["npm", "start"]
