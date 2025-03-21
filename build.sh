#!/bin/bash

# Clean up any previous builds
rm -rf dist

# Build the frontend application
npm run build

# Create necessary Netlify files if they don't exist
mkdir -p dist/public
[ -f dist/public/_redirects ] || echo "/* /index.html 200" > dist/public/_redirects

echo "Build completed successfully!" 