FROM node:10

ENV APP_DIR /app/
WORKDIR ${APP_DIR}

COPY . ./
RUN yarn install

ENV NUXT_HOST 0.0.0.0
EXPOSE 3000

CMD ["yarn", "prod"]
