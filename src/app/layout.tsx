import type {Metadata, Viewport} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  metadataBase: new URL('https://agrograde-insights.com'),
  title: {
    default: 'AgroGrade Insights - Professional Agricultural Analysis',
    template: '%s | AgroGrade Insights'
  },
  description: 'Enterprise-grade AI-powered crop analysis and quality assessment platform. Real-time tomato detection, ripeness classification, and agricultural intelligence for modern farming.',
  keywords: [
    'agricultural analysis',
    'crop monitoring',
    'tomato detection',
    'AI agriculture',
    'fruit ripeness',
    'quality assessment',
    'smart farming',
    'precision agriculture',
    'computer vision',
    'crop intelligence'
  ],
  authors: [{ name: 'AgroGrade Team' }],
  creator: 'AgroGrade Insights',
  publisher: 'AgroGrade Insights',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://agrograde-insights.com',
    title: 'AgroGrade Insights - Professional Agricultural Analysis',
    description: 'Enterprise-grade AI-powered crop analysis and quality assessment platform',
    siteName: 'AgroGrade Insights',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgroGrade Insights - Professional Agricultural Analysis',
    description: 'Enterprise-grade AI-powered crop analysis and quality assessment platform',
    creator: '@agrograde',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
    { media: '(prefers-color-scheme: dark)', color: '#1e3a8a' }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Classic Professional Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
