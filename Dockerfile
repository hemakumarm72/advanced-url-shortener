# Use the official Node.js image as a base
FROM node:22

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install
COPY . .

RUN npm run server:build

# Copy the rest of the application files to the container
COPY . .

# Expose the application's port (e.g., 8000)
EXPOSE 8000

# Define the command to start your Node.js app
CMD ["npm", "run", "server:run"]
