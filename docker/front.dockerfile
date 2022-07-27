FROM node:alpine

WORKDIR "/app"

RUN yarn global add typescript

COPY ./package.json ./

COPY ./decorate-angular-cli.js ./decorate-angular-cli.js

COPY ./angular.json ./angular.json

COPY ./apps/contact-list-e2e/project.json ./apps/contact-list-e2e/project.json

COPY ./tsconfig.base.json ./tsconfig.base.json

COPY ./apps/api/project.json ./apps/api/project.json

COPY ./apps/contact-list/ ./apps/contact-list/


RUN yarn install


CMD [ "yarn", "run", "start", "contact-list", "--host", "0.0.0.0" ]
