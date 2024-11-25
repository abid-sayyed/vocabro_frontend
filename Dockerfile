# Use an official Node.js runtime as a parent image
FROM node:20.18.0-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the entire application code to the container
COPY . .

# Copy .env file to the container (so the app can use it)
COPY .env.production .env.production

# Build the TypeScript application
RUN npm run build

# Expose the port the app will run on
EXPOSE 3000

# Start the application in production mode
CMD [ "npm", "start" ]
