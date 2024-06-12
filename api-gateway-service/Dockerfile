FROM node:20

RUN mkdir /app
WORKDIR /app
ADD package.json /app
ADD . /app
RUN npm install
RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start:prod"]
