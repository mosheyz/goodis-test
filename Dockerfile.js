FROM node:26-alpine

WORKDIR /app

COPY . .

CMD ["node", "--watch", "app.js"]

EXPOSE 3000