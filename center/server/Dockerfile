FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8787

COPY package.json ./
RUN npm install --omit=dev --ignore-scripts && npm cache clean --force

COPY src ./src

EXPOSE 8787

USER node

CMD ["node", "src/server.mjs"]
