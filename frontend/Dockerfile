FROM node:12
WORKDIR /usr/src/app
COPY . .
RUN npm install 
RUN npm install react-scripts@3.4.1 -g
EXPOSE 3000
CMD ["npm", "start"]
