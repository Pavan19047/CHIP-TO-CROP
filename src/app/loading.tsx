import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-heading font-bold text-foreground">
            Loading AgroGrade Insights
          </h2>
          <p className="text-sm text-muted-foreground">
            Preparing your agricultural intelligence platform...
          </p>
        </div>
      </div>
    </div>
  );
}
