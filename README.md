# Digital Portfolio

A modern, responsive digital portfolio website built with React, Vite, and TailwindCSS.

## Deployment on Netlify

This project is optimized for deployment on Netlify. Follow these steps to deploy:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Login to [Netlify](https://www.netlify.com/)
3. Click "New site from Git"
4. Select your repository
5. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist/public`
6. Click "Deploy site"

## Local Development

To run the project locally:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

## Build for Production

To build the project for production:

```bash
# Clean previous builds
rm -rf dist  # Linux/Mac
# or
if exist dist rmdir /s /q dist  # Windows

# Build the project
npm run build

# Ensure _redirects file exists
mkdir -p dist/public  # Linux/Mac
# or
if not exist dist\public mkdir dist\public  # Windows

echo "/* /index.html 200" > dist/public/_redirects  # Linux/Mac
# or
echo /* /index.html 200 > dist\public\_redirects  # Windows
```

The build output will be in the `dist/public` directory. 