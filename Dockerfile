FROM node:10

ENV APP_DIR /app/
WORKDIR ${APP_DIR}

COPY . ./
RUN yarn install

EXPOSE 3000

CMD ["yarn", "prod"]
