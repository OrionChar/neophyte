FROM node:22-alpine as build
WORKDIR /usr/src/neophyte

COPY . .
RUN npm ci
RUN npm run build

FROM nginx:mainline

COPY --from=build /usr/src/neophyte/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/neophyte/dist /usr/share/nginx/html

EXPOSE 83

CMD [ "nginx", "-g", "daemon off;" ]
