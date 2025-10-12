# CHIP TO CROP - AgroGrade Insights

AI-powered fruit sorting and analytics dashboard built with Next.js, TypeScript, and Google Genkit.

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Google AI API key for Genkit

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Add your Google AI API key:
     ```
     GOOGLE_GENAI_API_KEY=your_api_key_here
     ```

### Running the App

Development mode:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Features

- AI-powered image analysis and comparison
- Real-time analytics dashboard
- Data labeling and collection tools
- Live camera feed integration
- Responsive UI with shadcn/ui components

## Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **AI:** Google Genkit with Gemini
- **UI:** Tailwind CSS + shadcn/ui
- **Charts:** Recharts
