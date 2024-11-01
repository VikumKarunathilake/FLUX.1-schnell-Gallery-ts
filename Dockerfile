# Use the official Node.js image for building the app.
FROM node:16 AS build

ENV VITE_API_BASE_URL=https://flux-api.up.railway.app
ENV PORT=3000
# Set the working directory.
WORKDIR /app

# Copy package.json and package-lock.json for installing dependencies.
COPY package*.json ./

# Install the dependencies.
RUN npm install

# Copy the entire project.
COPY . .

# Build the Vite project.
RUN npm run build

# Use the official Nginx image to serve the built files.
FROM nginx:alpine

# Copy the build files from the previous stage.
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port the app runs on.
EXPOSE 80

# Start Nginx.
CMD ["nginx", "-g", "daemon off;"]
