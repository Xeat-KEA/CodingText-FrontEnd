FROM node:21-alpine AS builder
WORKDIR /app
COPY package*.json ./
# npm 설치
RUN npm install
COPY . .
# Next.js를 빌드한다.
RUN npm run build
#RUN npm run export
# 이미지 생성
FROM nginx
# 오픈할 포트를 적어둔다.
EXPOSE 3000
RUN rm /etc/nginx/conf.d/default.conf
RUN rm -rf /etc/nginx/conf.d/*
# default.conf을 /etc/nginx/conf.d/ 경로에 있는 default.conf에 복사한다.
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out /usr/share/nginx/html