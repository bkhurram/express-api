# specify the node base image with your desired version node:<version>
FROM node:18

# Create app directory
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

# Install app dependencies
COPY package.json package-lock.json /home/node/app
RUN npm ci

# Bundle app source
COPY . /home/node/app

# replace this with your application's default port
EXPOSE 3000

CMD [ "npm", "start" ]