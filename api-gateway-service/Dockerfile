FROM node:20

RUN mkdir /api-gateway-service
WORKDIR /api-gateway-service
ADD package.json /api-gateway-service
ADD . /api-gateway-service
RUN npm install
RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start:prod"]
