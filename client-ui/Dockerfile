FROM node:16.13.1-alpine3.14

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 5173

CMD ["yarn", "dev"]