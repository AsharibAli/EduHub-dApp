# EduHub dApp

## Overview
EduHub is an educational decentralized application (dApp) built with Next.js, designed to help users learn blockchain technology, Web3 development, and integrate Open Campus ID (OCID) and Open Campus Achievements (OCA). The platform provides interactive workshops and tutorials to guide developers from beginner to advanced levels in blockchain development.

## Features
- **Interactive Workshops**: Comprehensive bootcamps introducing blockchain and Web3 fundamentals
- **In-depth Tutorials**: Step-by-step guides for OCID and OCA integration
- **User Authentication**: Secure authentication using Open Campus ID
- **Achievement Tracking**: Progress tracking through the Open Campus Achievement system
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS
- **Modern Stack**: Next.js, TypeScript, and Tailwind CSS for a robust frontend experience

## Tech Stack
- **Frontend**: Next.js 14.2, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn UI components
- **Authentication**: Open Campus ID (@opencampus/ocid-connect-js)
- **Blockchain Interaction**: Web3.js
- **Build Tools**: Turbo

## Installation

### Prerequisites
- Node.js (v18.0 or higher)
- npm or yarn
- Git

### Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/asharibali/eduhub-dapp.git
   cd eduhub-dapp
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   ```bash
   # Copy the example env file
   cp env.example .env.local

   # Edit .env.local and add your values
   # Replace 'your_api_key_here' with your actual OCA API key
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure
- `app/`: Contains all the page components and routing
  - `workshop/`: Workshop content for blockchain bootcamp
  - `tutorial/`: Tutorial content for OCID and OCA integration
  - `user/`: User authentication and profile pages
- `components/`: Reusable UI components
- `lib/`: Utility functions and shared logic
- `public/`: Static assets
- `types/`: TypeScript type definitions

## Educational Content
The dApp includes two main educational paths:

### 1. Blockchain Bootcamp Workshop
A three-day comprehensive introduction to blockchain concepts, designed for beginners who want to understand the fundamentals of blockchain technology and Web3 development.

### 2. OCID & OCA Integration Tutorial
A detailed guide on integrating Open Campus ID and Achievements into dApps, covering:
- OCID Authentication
- Smart Contract Integration
- Open Campus Achievement Implementation
- Best Practices for Web3 Development

## Deployment
The application can be deployed to platforms like Vercel or Netlify:

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- Built with [Open Campus SDK](https://github.com/opencampus)
- EduHub Founder & CTO [Asharib Ali](https://github.com/asharibali)
- EduHub Co-Builder [Khizar Bakhtiar](https://github.com/khizarbakhtiar1) 

## Environment Variables

This application uses the following environment variables:

| Variable | Description | Default |
|----------|-------------|--------|
| `OCA_API_KEY` | API key for Open Campus Achievements | - |
| `OCA_ENVIRONMENT` | Environment for OCA API (sandbox or production) | sandbox |

You must set the `OCA_API_KEY` value in your `.env.local` file for credential issuance to work.