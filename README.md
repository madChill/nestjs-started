# Full Stack Nestjs  Template

## Technology Stack and Features

- ⚡ [**MICROSERVICE NESTJS**] for the nestjs backend API.
    - 💾 [PostgreSQL](https://www.postgresql.org) as the SQL database.
- 🚀 [React](https://react.dev) for the frontend.
    - 💃 Using TypeScript, hooks, Vite, and other parts of a modern frontend stack.
    - 🎨 [Antd] for the frontend components.
    - 🤖 An automatically generated frontend client.
    - 🦇 Dark mode support.
- 🐋 [Docker Compose](https://www.docker.com) for development and production.
- 🔒 Secure password hashing by default.
- 🚢 Deployment instructions using Docker Compose, including how to set up a frontend Traefik proxy to handle automatic HTTPS certificates.
- 🏭 CI (continuous integration) and CD (continuous deployment) based on GitHub Actions.

## for running locally for backend side
``` js
  docker compose -f docker-compose-dev.yaml up
```
Now you can access http://localhost:4000/graphql backend api-gateway

## for frontend side 

Install packages 
``` js
  npm i -g pnpm 
```
then 
``` js
 cd vite-react-graphql && pnpm dev
```

Now you can access http://localhost:3010 for ui management employees

