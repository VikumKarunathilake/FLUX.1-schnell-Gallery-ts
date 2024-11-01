# Use the official Node.js image for building the app.
FROM node:16

# Set the working directory.
WORKDIR /app

# Copy package.json and package-lock.json for installing dependencies.
COPY package*.json ./

# Install the dependencies.
RUN npm install

# Copy the entire project.
COPY . .

# Set the environment variable
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=https://flux-api.up.railway.app
ENV PORT=3000

# Expose the port that Vite uses
EXPOSE 3000

# Start the Vite development server
CMD ["npm", "run", "dev", "--host"]