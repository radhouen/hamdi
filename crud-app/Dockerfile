FROM node:alpine as builder 

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./package*.json ./
RUN npm install 

COPY . .
RUN npm run build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /usr/src/app/dist/crud-app /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
