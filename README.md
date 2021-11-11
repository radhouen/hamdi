# Docker and Git Workflow for Developer Environments 

In this repository you will find examples that will showcase the following, 

• Docker Compose based developer environment for Node JS and Mongo DB 

• Ability to clone Git code and run in local environment 

• Bind mounting and Nodemon to allow for developers to make changes locally and reflect on containers

Purpose of this is to allow for developers to easily get access to a Node JS environment to build new apps and hence reduce overall setup time. 

## Steps to Setup 

### Install Pre-Requisities 

[Install Docker and Docker Compose](https://docs.docker.com/compose/install/)

[Install GIT CLI](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

[Create account within GitHub](https://github.com/join)

### Steps to Setup Environment 

```shell
#Clone this repository
git clone <copy repository url>

#Navigate inside employee-node-api folder
cd employee-node-api

#Run Docker Compose Up
docker-compose up --build

#Alternatively, you can run your containers in the backgroud 
docker-compose up -d --build

#To test whether your API is working or not
curl -i http://localhost:1008/v1/employee/13

#If run on a new DB, then expected output should be
```
```json
{
    "status": "success",
    "message": "No employee found with the ID : 13"
}
``` 

Now you will have a working Node JS and Mongo DB environment - navigate to the /node-app/app folder and make changes - they will reflect directly onto the container without having to build again












