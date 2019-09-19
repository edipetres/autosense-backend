# Serverless Backend for the Autosense Exercise App

## Deployment with CI/CD

Our application is hosted on Github where each commit will trigger our Continuous Integartion pipeline. The CI pipeline builds the code, runs the tests and deployes to production when all the checks have passed. This way we ensure there is continous integartion and deployment of the latest version.

## Database

A managed MongoDB instance is running on MongoDB Atlas. I used a free sandbox version that offers 500 MB of storage for free. It was populated with the given JSON data by running the following command: `node src/app/helpers/import.js`

## Architecture

The object entities (such as `vehicle`) are grouped into their own folders in `src/app`. There, you can see four different handlers: `controller, model, repository and router`. 

**Model** is responsible for defining the entity (object) model and it also servers as the mongoose schema for validating fields of the object (for example before inserting data into the database). 

**Repository** takes care of every interaction with the database - we can call it the presistence layer. It knows of the model and only this file can use the mongoose model to interact with the database.  

**Controller** will handle incoming HTTP requests and uses the repository for getting data in and out of the system. 

**Router** defines all the routes and methods for a specific entity and delegates these endpoints for certain methods of the controller.

The above architecture provides a clean and organized setup. It also allows easy extension of the system for both horizontal sclaing (adding more entities/endpoints) and vertical scaling (adding more functionality to existing endpoints). Using this setup we adhere to good coding practices, like separation of concerns, single responsibility, DRY code that can also make testing easier.

## Pre-configuration

I corrected a few typos in the JSON data. It did not change the format or the values of the content, only renamed the following variables: `latittude -> latitude, mlieage -> mileage and litters -> liters`.
