
# URL Shortener API Project


## API-DOCS

## https://hemakumar.online/api-docs

## Overview

This project implements a URL shortening service that allows users to create shortened URLs and get analytics for their usage. The system uses Redis for caching and session management, along with MongoDB for data storage and aggregation. Rate limiting is enforced to control the number of short links created within a set time period.

### Database Model
## https://dbdiagram.io/d/shorten-url-6764285f6ae6af4766b7c0fc



### Key Features:
- **URL Shortening**: Allows users to shorten URLs with custom aliases.
- **Redirect with Cache**: Redirects to the original URL by caching redirection data in Redis for faster access.
- **Rate Limiting**: Limits URL shortening creation to 50 requests per 15 minutes.
- **Redis Session Store**: Manages user session data in Redis for quick retrieval.
- **MongoDB Integration**: Stores URL mappings, click statistics, and analytics data in MongoDB.
- **Optimized Data Aggregation**: Uses MongoDB aggregation to efficiently fetch and process data.
- **Memory Optimization**: Reuses functions to minimize memory usage and optimize performance.

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
# General Environment Settings
NODE_ENV=development  # development | production
IS_MAINTENANCES=false

# Port number for the server
PORT=8000

# Server Host URL (Set your domain or localhost URL here)
BASE_URL=http://localhost:8000  # Change this if you have a production URL

# MongoDB (Remote)
DB_HOST=cluster0.xxx.mongodb.net  # Remote MongoDB host
DB_PROTOCOL=mongodb+srv  # The protocol used for MongoDB connections
DB_NAME=your_db_name  # Your MongoDB database name
DB_USER=your_mongo_user  # MongoDB username
DB_PASS=your_mongo_password  # MongoDB password

# Redis (Local or Remote)
REDIS_URL_HOST=127.0.0.1  # Local Redis URL or IP (use actual remote IP if Redis is remote)
REDIS_URL_PORT=6379  # Default Redis port

# Google Authentication Settings
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CLIENT_REDIRECT=http://localhost:8000  # Change this to the production URL if needed
```

### Installation Setup.

```sh
npm install  # install package
npm run server:build 
npm run server:run # run server
```

## docker
```sh
docker compose --build -d or docker-compose --build -d
```
