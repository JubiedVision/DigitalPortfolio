#!/bin/bash

# Clean up any previous builds
rm -rf dist

# Build the frontend application
npm run build

# Create necessary Netlify files if they don't exist
# No need to create dist/public manually since vite already does that
[ -f dist/public/_redirects ] || echo "/* /index.html 200" > dist/public/_redirects

echo "Build completed successfully!" 