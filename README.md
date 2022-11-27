
https://github.com/nodejs/docker-node


## CREATE IMAGE
docker build -t express-api .
docker run -it --rm -p 3000:3000 --name my-running-app express-api


## CREATE CONTAINER
docker-compose up