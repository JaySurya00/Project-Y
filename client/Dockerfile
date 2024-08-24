FROM node:alpine
WORKDIR /app

COPY package.json ./
COPY next.config.mjs ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]