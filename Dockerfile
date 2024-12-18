FROM node:22.12
ENV TZ Asia/Seoul
WORKDIR /frontend/
COPY ./package*.json /frontend/
RUN npm install
COPY . /frontend/
RUN npm run build
RUN mkdir -p ./public/ssr/_next
RUN cp -R ./.next/static ./public/ssr/_next/static
CMD ["npm", "run", "start"]