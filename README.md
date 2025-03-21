# Digital Portfolio

A modern portfolio website built with React, Vite, and Tailwind CSS.

## Netlify Deployment

This repository is optimized for deployment on Netlify. Follow these steps to deploy:

1. Connect your GitHub repository to Netlify
2. Use the following build settings:
   - Build command: `npm run build`
   - Publish directory: `dist/public`
   - Node version: 18

### Environment Variables

Set these environment variables in the Netlify dashboard:
- `SUPABASE_URL`: Your Supabase URL
- `SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Local Development

1. Clone this repository
2. Install dependencies:
```
npm install
```
3. Create a `.env.local` file in the client directory with your Supabase credentials
4. Start the development server:
```
npm run dev
```

## Build for Production

```
npm run build
```

This will generate the production build in the `dist/public` directory. 