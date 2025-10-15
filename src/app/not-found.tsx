'use client';

import Link from 'next/link';
import { AlertCircle, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center">
            <AlertCircle className="h-12 w-12 text-primary" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-6xl font-bold font-heading text-primary">
            404
          </h1>
          <h2 className="text-2xl font-bold font-heading text-foreground">
            Page Not Found
          </h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          <Link href="/dashboard">
            <Button className="gap-2">
              <Home className="h-4 w-4" />
              Go to Dashboard
            </Button>
          </Link>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.history.back();
              }
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Common pages:
          </p>
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            <Link href="/dashboard" className="text-sm text-primary hover:underline">
              Dashboard
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/dashboard/tomatoes" className="text-sm text-primary hover:underline">
              Tomato Detection
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/dashboard/analytics" className="text-sm text-primary hover:underline">
              Analytics
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/dashboard/advisor" className="text-sm text-primary hover:underline">
              AI Advisor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
