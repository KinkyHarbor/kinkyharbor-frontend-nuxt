FROM node:10

# Setup env
EXPOSE 3000
ARG API_URL
ENV API_URL ${API_URL}
ENV APP_DIR /app/
ARG DEMO=True
ENV DEMO ${DEMO}
ARG KH_BASE_URL
ENV KH_BASE_URL ${KH_BASE_URL}
ENV NUXT_HOST 0.0.0.0
ARG TZ=Europe/Brussels
ENV TZ ${TZ}
WORKDIR ${APP_DIR}

# Compile application
COPY . ./
RUN yarn install
RUN yarn build

# Run application
CMD ["yarn", "start"]
