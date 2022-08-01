FROM node:alpine

WORKDIR "/app"

RUN yarn global add typescript

COPY ./package.json ./package.json

COPY  ./tsconfig.base.json ./tsconfig.base.json

COPY ./decorate-angular-cli.js ./decorate-angular-cli.js

COPY ./nx.json ./nx.json

COPY ./apps/contact-list/project.json ./apps/contact-list/project.json

COPY ./apps/contact-list-e2e/project.json ./apps/contact-list-e2e/project.json

COPY ./apps/api/project.json ./apps/api/project.json

RUN yarn add nx

CMD [ "yarn", "install" ]

