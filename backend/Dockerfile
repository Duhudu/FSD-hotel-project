# Use Node.js as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json first (so we can install dependencies)
COPY package*.json ./

# Install dependencies (this installs things specific to THIS service)
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the port (Just for documentation, Compose handles the real mapping)
EXPOSE 9000

# Start the app
CMD ["npm", "start"]