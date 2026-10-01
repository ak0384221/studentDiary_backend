# FROM node:24-alpine

# WORKDIR /app

# ENV CI=true

# COPY package.json pnpm-*.yaml ./

# RUN npm install -g pnpm@10.30.1

# RUN pnpm install --frozen-lockfile

# COPY . .

# RUN pnpm build

# EXPOSE 3000

# CMD [ "node","dist/server.js" ]


FROM node:24-alpine AS build

WORKDIR /app

ENV CI=true

RUN npm install -g pnpm@10.30.1

COPY package.json pnpm-*.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

RUN pnpm prune --prod


FROM node:24-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json ./

USER node

EXPOSE 5000
CMD [ "node","dist/server.js" ]

