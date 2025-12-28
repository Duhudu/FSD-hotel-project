# 1. Use an official Node.js runtime as a parent image
FROM node:18-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package.json and package-lock.json first
# This allows Docker to cache the installation step if dependencies haven't changed
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the application code
COPY . .

# 6. Expose port 3000 (React default)
EXPOSE 3000

# 7. Start the React development server
CMD ["npm", "start"]