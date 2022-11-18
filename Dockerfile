FROM node:16

WORKDIR /

COPY ./dist /dist

COPY ./node_modules /node_modules

CMD [ "node", "dist/main" ]
