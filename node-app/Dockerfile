#Pull latest node base image
FROM node:latest

#Set the working directory
WORKDIR /app

RUN npm install -g nodemon

#Copy code from your machine directory into working directory
COPY ./app/package*.json ./
COPY ./app/app.js ./

#Install the app and its depdendencies with NPM 
RUN npm install

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

## Launch the wait tool and then your application
CMD /wait && nodemon app.js



