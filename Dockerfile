FROM node:18 as builder
WORKDIR /app
COPY ./package*.json /app
RUN npm install
COPY . .
RUN npm run build

FROM nginx 
EXPOSE 3000
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build  /usr/share/nginx/html\