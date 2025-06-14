FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN apt-get update && apt-get install -y netcat-openbsd
CMD ["sh", "-c", "until nc -z db 3306; do echo waiting for mysql; sleep 2; done; npm start"]
CMD ["node", "server.js"]