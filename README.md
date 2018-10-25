# OpenLibrary :books:


Open Library is an open source library system. It is more *focused on small scale libraries typically available on offices and other organizational units.*
It is free! Anyone can contribute this to make this a robust system. This repository do not have a complete system. **It only contains a server-side** back end which serves as an API for user interfaces.

## Technologies: NodeJS, Docker, MongoDB

### Frameworks: [Express.js](https://expressjs.com/), [Mongoose](https://mongoosejs.com/)

## Steps to run

1. Build `docker-compose build`
2. Run `docker-compose up`

Find the API documentation through http://localhost:8080/api-docs/

Use [Postman](https://www.getpostman.com/) app

To save a book to DB
`POST` http://localhost:8080/api/book
Note: no need to send any data now, it's hard-coded in server side

To get all saved books
`GET` http://localhost:8080/api/book

Stop the services by `docker-compose stop`
