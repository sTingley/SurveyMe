FROM node:12
WORKDIR /usr/src/app
COPY . .
RUN npm install
COPY ../config.json .
COPY . .
EXPOSE 5000
CMD ["node", "index.js"]
