# Hubla Payments's Exercise - Web App with Nest.js and React
This is a web application developed with Nest.js (back-end) and React (front-end), and uses Docker Compose to set up the solution. The database is PostgreSQL with TypeORM as ORM. The application provides a Swagger documentation for the API.

The instructions to develop the application are at the file "instructions.md".

This stack was chosen because it's Hubla's main development stack.

### Instruction's deviation
At the original instruction it is said that the TransactionType "3" is comission paid, and "4" is comission received. But analyzing the sales.txt file it becomes clear that this numeration is inverted.

For example, for the transaction at datetime "2022-01-16T14:13:54-03:00" we have the following data:

Type | Seller | Value 
--- | --- | --- 
2 | THIAGO OLIVEIRA | $ 127.50 
3 | JOSE CARLOS | $ 45.00
4 | THIAGO OLIVEIRA | $ 45.00

It's clear that Thiago is the affiliate paying the comission to the content creator José. So it makes no sense that José pays Thiago, as the original instruction suggests.

To make sense of the data the program is developed with the corrected instruction, but to return to the original instruction if the datafile is corrected you have only to change the parameters at the backend file "sellerBalance.dto.ts".

### Prerequisites
To run this application, you need to have Docker and Docker Compose installed on your machine.

### Setup
Clone this repository to your local machine.

Rename both "dot.env-dev" files to ".env".

Open a terminal and navigate to the root directory of the project.

Run the following command to start the application:

```
docker-compose up
```

Wait for the containers to start. This may take a few minutes.

Once the containers are up and running, you can access the application at http://localhost:3001.

### Swagger Documentation
The Swagger documentation for the API is available at http://localhost:3000/docs.

### Development
To develop the application, you will need to have Node.js, npm and yarn installed on your machine. You can then run the following commands:

Rename both "dot.env-dev" files to ".env".

Setup a postgres database at port 5432 with the dbname hubla_payments_exercise_database and , user postgres and password mysecretpassword. You can use the following docker command:

```
docker run -d --name hubla-postgres -e POSTGRES_DB=hubla_payments_exercise_database -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 postgres
```

Navigate to the backend directory and run the following commands:

```
npm install
//Creates the tables at the new database
npm run migration:run
npm run start:dev
```
This will start the Nest.js server in development mode.

Open another terminal and navigate to the frontend directory.

Run the following commands:

```
yarn install
yarn run start
```
This will start the React development server.

You can now make changes to the code and see the changes reflected in the browser.

### Future Development
This is only an exercise an still has many points to be enhanced. Some of then are:

- Complete Unit Tests at the Front-end;
- Include data validation at the form;
- Enhance documentation at Swagger;
- Include user authorization/authentication;
- Avoid input of repeated transaction info;
- Enhance CSS;
- Table sort and filter;
- Solve dependancy vulnerabilities/warnings.