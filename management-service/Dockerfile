FROM node:20

RUN mkdir /management-service
WORKDIR /management-service
ADD package.json /management-service
ADD . /management-service
RUN npm install
RUN npm run build

EXPOSE 5005

CMD ["npm", "run", "start:prod"]
