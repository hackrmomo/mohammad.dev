FROM node:18
WORKDIR /usr/local/share/admin.mohammad.dev

ARG PORT

COPY ./package.json ./
RUN yarn
COPY ./ ./

EXPOSE ${PORT}

RUN yarn build
CMD ["yarn", "dev"]