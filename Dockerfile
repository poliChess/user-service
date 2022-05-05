FROM node:17.8.0-alpine as base

RUN mkdir -p /app
WORKDIR /app

COPY . .

EXPOSE 3000

RUN npm install

CMD ["npm", "run", "start"]
