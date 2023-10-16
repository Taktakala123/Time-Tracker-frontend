FROM node:alpine as build 

WORKDIR /app

COPY . .

RUN yarn build 


FROM nginx:alpine as production-build

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8081

ENTRYPOINT ["nginx", "-g", "daemon off;"]





 