# OpenLibrary :books:


Open Library is an open source library system. It is more *focused on small scale libraries typically available on offices and other organizational units.*
It is free! Anyone can contribute this to make this a robust system. This repository do not have a complete system. **It only contains a server-side** back end which serves as an API for user interfaces.

## Technologies: NodeJS, Docker

## Steps to test run

docker build -t <your_tag> .

docker run -p 4000:8080 <your_tag>

Open PowerShell

curl http://localhost:4000/
