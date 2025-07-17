
# Code Garden Website

A modern, responsive website for Code Garden - a coding education platform for children.

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## Getting Started

1. **Clone or download the project**
2. **Navigate to the WebsiteClone directory**
   ```bash
   cd WebsiteClone
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   - Copy the `.env` file or create one with:
   ```
   GMAIL_USER=your-gmail@gmail.com
   GMAIL_APP_PASSWORD=your-app-password
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Access the website**
   - Open your browser and go to `http://localhost:5000`
   - The server will serve both the API and the client

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run start:local` - Alternative local development command

## Features

- Modern React frontend with TypeScript
- Express.js backend API
- Email notifications for contact forms
- Responsive design
- Newsletter subscription
- Course inquiry system

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Express.js, TypeScript
- **Email**: Nodemailer with Gmail
- **Database**: Drizzle ORM (configured for various databases)

## Production Deployment

1. Build the project: `npm run build`
2. Start production server: `npm run start`
3. The app will serve on port 5000

## Environment Variables

- `GMAIL_USER` - Gmail address for sending notifications
- `GMAIL_APP_PASSWORD` - Gmail app password for authentication
- `NODE_ENV` - Set to 'development' for dev mode, 'production' for production

## VSCode Setup

The project includes VSCode configuration for optimal development experience with TypeScript, ESLint, and debugging support.
# CODEGARDEN
# latestsite3
