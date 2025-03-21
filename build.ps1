# Clean up any previous builds
if (Test-Path -Path "dist") {
  Remove-Item -Recurse -Force "dist"
}

# Build the frontend application
npm run build

# Create necessary Netlify files if they don't exist
if (-not (Test-Path -Path "dist/public/_redirects")) {
  if (-not (Test-Path -Path "dist/public")) {
    New-Item -ItemType Directory -Path "dist/public" -Force
  }
  Set-Content -Path "dist/public/_redirects" -Value "/* /index.html 200"
}

Write-Host "Build completed successfully!" -ForegroundColor Green 