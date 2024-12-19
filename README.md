# URL Shortener API Project

## http://132342:8000/api-docs


## Overview

This project implements a URL shortening service that allows users to create shortened URLs and get analytics for their usage. The system uses Redis for caching and session management, along with MongoDB for data storage and aggregation. Rate limiting is enforced to control the number of short links created within a set time period.

### Key Features:
- **URL Shortening**: Allows users to shorten URLs with custom aliases.
- **Redirect with Cache**: Redirects to the original URL by caching redirection data in Redis for faster access.
- **Rate Limiting**: Limits URL shortening creation to 50 requests per 15 minutes.
- **Redis Session Store**: Manages user session data in Redis for quick retrieval.
- **MongoDB Integration**: Stores URL mappings, click statistics, and analytics data in MongoDB.
- **Optimized Data Aggregation**: Uses MongoDB aggregation to efficiently fetch and process data.
- **Memory Optimization**: Reuses components to minimize memory usage and optimize performance.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime for the API.
- **Express**: Web framework for Node.js to build RESTful APIs.
- **MongoDB**: NoSQL database for storing URL mappings and analytics.
- **Redis**: In-memory data store for caching and session management.
- **Swagger**: API documentation for easy integration and usage.

## Installation

```sh
- Nodejs (22 LTS or 18)
- Redis
- TS-Node
```


### Prerequisites
- Node.js installed on your machine.
- MongoDB instance running locally or remotely.
- Redis instance running locally or remotely.

### Steps to Set Up the Project:

#### Environment variables setup

```sh
NODE_ENV=development # development | production
IS_MAINTENANCES=false



# Port number
PORT=8000  


# Server Host
BASE_URL=Domain # https://Domain.com or http://localhost:8000



#MongoDB
DB_HOST=cluster0.xxx.mongodb.net
DB_PROTOCOL=mongodb+srv
DB_NAME=xxxx
DB_USER=xxxx
DB_PASS=xxxxx


#Redis
REDIS_URL_HOST=127.0.0.1
REDIS_URL_PORT=6379 #default port



# Google Auth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CLIENT_REDIRECT='http://localhost:8000'  # domain or localhost

```

### Installation Setup.

```sh
npm install  # install package
npm run server:build 
npm run server:run # run server
```