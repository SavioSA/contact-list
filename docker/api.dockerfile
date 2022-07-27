FROM node:alpine

WORKDIR "/app"

RUN yarn global add typescript

COPY ./package.json ./

COPY ./decorate-angular-cli.js ./decorate-angular-cli.js

COPY ./apps/contact-list-e2e/project.json ./apps/contact-list-e2e/project.json

COPY ./tsconfig.base.json ./tsconfig.base.json

COPY ./apps/contact-list/project.json ./apps/contact-list/project.json

COPY ./apps/api/ ./apps/api/


RUN yarn install


CMD [ "yarn", "run", "start", "api", "--host", "0.0.0.0" ]
