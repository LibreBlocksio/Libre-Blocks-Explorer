
FROM node:latest
WORKDIR /app
COPY package.json yarn.lock /app/
COPY public /app/public
COPY src /app/src
RUN yarn install
COPY . /app
CMD ["yarn", "dev"]