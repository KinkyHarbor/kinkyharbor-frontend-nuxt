FROM node:10

# Setup env
EXPOSE 3000
ENV APP_DIR /app/
ENV NUXT_HOST 0.0.0.0
WORKDIR ${APP_DIR}

# Setup application
COPY . ./
RUN yarn install

# Compile and run application
CMD ["yarn", "prod"]
