FROM node:16.13.1-alpine3.14

WORKDIR /app

RUN npm install -g @nestjs/cli

COPY package*.json /app

RUN npm install

COPY prisma/schema.prisma ./prisma/

RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD ["npm","run" ,"start:dev"]
