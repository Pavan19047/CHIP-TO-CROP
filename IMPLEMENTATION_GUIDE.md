# Chip to Crop - Complete Feature Implementation Guide

## Overview
This document provides implementation details for the comprehensive dashboard features including Upload Data, Sorting Results, Reports, Batch History, Rule Setting, Simulation Mode, Quality Insights, Notifications, and AI Advisor.

## Environment Setup

### Required Environment Variables

Create a `.env.local` file in the project root:

```bash
# Google Genkit AI Configuration
GOOGLE_GENAI_API_KEY=your_google_ai_api_key_here
GENKIT_ENV=dev

# Cloud Storage (S3/Azure/GCP)
CLOUD_STORAGE_BUCKET=your-bucket-name
CLOUD_STORAGE_REGION=us-east-1
CLOUD_STORAGE_ACCESS_KEY=your_access_key
CLOUD_STORAGE_SECRET_KEY=your_secret_key

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/chip_to_crop
REDIS_URL=redis://localhost:6379

# Email Service (for notifications)
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM=noreply@chiptocrop.com

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# File Upload
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/webp,image/heic

# Report Generation
REPORT_STORAGE_PATH=./reports
PDF_GENERATOR=puppeteer

# Job Queue (for batch processing)
QUEUE_PROVIDER=bull
QUEUE_REDIS_URL=redis://localhost:6379
```

## Installation

```bash
# Install dependencies
npm install

# Install testing dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Install additional required packages
npm install date-fns recharts jspdf html2canvas

# Run development server
npm run dev

# Run tests
npm run test
```

## Feature Implementation Guide

### 1. Dashboard Overview
**Files Created:**
- `/src/lib/types/dashboard.ts` - TypeScript types
- `/src/lib/mock-data/dashboard-data.ts` - Mock data
- `/src/components/dashboard/dashboard-overview-enhanced.tsx` - Main component

**Usage:**
```tsx
import { DashboardOverview } from '@/components/dashboard/dashboard-overview-enhanced';
import { mockDashboardStats, mockActivityFeed, mockKPIData, mockAlerts } from '@/lib/mock-data/dashboard-data';

export default function DashboardPage() {
  return (
    <DashboardOverview
      stats={mockDashboardStats}
      activities={mockActivityFeed}
      kpis={mockKPIData}
      alerts={mockAlerts}
    />
  );
}
```

### 2. Upload Data (Single & Bulk)
**Files Created:**
- `/src/lib/types/upload.ts` - Upload types
- `/src/lib/upload-utils.ts` - Upload utilities
- `/src/components/dashboard/image-upload.tsx` - Upload component

**Presigned URL Flow:**
1. Client requests presigned URL from `/api/upload/presign`
2. Server generates presigned URL (S3/Azure/GCP)
3. Client uploads file directly to cloud storage
4. Client notifies server of completion
5. Server processes and stores metadata

**API Route Example:**
```typescript
// /src/app/api/upload/presign/route.ts
import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export async function POST(request: Request) {
  const { filename, contentType } = await request.json();
  
  const s3Client = new S3Client({ region: process.env.CLOUD_STORAGE_REGION });
  const command = new PutObjectCommand({
    Bucket: process.env.CLOUD_STORAGE_BUCKET,
    Key: `uploads/${Date.now()}-${filename}`,
    ContentType: contentType,
  });
  
  const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  
  return NextResponse.json({ uploadUrl, fileKey: command.input.Key });
}
```

### 3. Sorting Results
**Files Created:**
- `/src/lib/types/analysis.ts` - Analysis result types
- `/src/components/dashboard/results-table.tsx` - Sortable/filterable table

**Features:**
- Multi-column sorting
- Text search across multiple fields
- Dropdown filters (crop type, severity, detection type)
- Confidence threshold filtering
- Date range filtering
- Export filtered results

### 4. Reports (PDF/CSV Export)
**Files Created:**
- `/src/app/actions/reports.ts` - Server actions for report generation
- `/src/components/dashboard/report-generator.tsx` - Report UI

**Report Generation Flow:**
```typescript
// Generate CSV
const report = await generateReport(results, {
  format: 'csv',
  title: 'Monthly Analysis Report',
  dateRange: { from: startDate, to: endDate },
});

// Schedule recurring report
await scheduleReport({
  format: 'pdf',
  title: 'Weekly Report',
  schedule: 'weekly',
  recipients: ['user@example.com'],
  includeCharts: true,
});
```

### 5. AI Advisor (Google Genkit Integration)
**Files Created:**
- `/src/app/actions/advisor.ts` - AI advisor server actions
- `/src/components/dashboard/ai-advisor.tsx` - Chat interface

**Integration:**
```typescript
// Ask AI Advisor
const response = await askAdvisor({
  question: "How do I interpret confidence scores?",
  context: {
    userRole: "farmer",
    recentActivity: ["uploaded 10 images", "generated report"],
  },
});

// Response includes:
// - answer: string
// - confidence: number
// - sources: string[]
// - followUpQuestions: string[]
```

**Google Genkit Setup:**
```bash
# Install Genkit
npm install @genkit-ai/core @genkit-ai/googleai

# Initialize in /src/ai/genkit.ts
import { genkit } from '@genkit-ai/core';
import { googleAI } from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-1.5-flash',
});
```

## Testing

### Running Tests
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Files
- `__tests__/dashboard-overview.test.tsx` - Dashboard component tests
- `__tests__/upload-utils.test.ts` - Upload utility tests

## Database Schema (Mock Implementation)

### Analysis Results Table
```sql
CREATE TABLE analysis_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  filename TEXT NOT NULL,
  analyzed_at TIMESTAMP DEFAULT NOW(),
  crop_type VARCHAR(50),
  detection_type VARCHAR(50),
  confidence DECIMAL(5,2),
  severity VARCHAR(20),
  findings JSONB,
  recommendations JSONB,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Batch Jobs Table
```sql
CREATE TABLE batch_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  total_files INTEGER,
  completed_files INTEGER DEFAULT 0,
  failed_files INTEGER DEFAULT 0,
  status VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  errors JSONB
);
```

### Rules Table
```sql
CREATE TABLE rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  condition JSONB NOT NULL,
  action JSONB NOT NULL,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Deployment

### Build for Production
```bash
# Build Next.js app
npm run build

# Start production server
npm start
```

### Docker Deployment
```dockerfile
FROM node:20-alpine AS base

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Configuration Checklist
- [ ] Configure Google AI API key for Genkit
- [ ] Set up cloud storage bucket and credentials
- [ ] Configure database connection
- [ ] Set up email service for notifications
- [ ] Configure Redis for job queue
- [ ] Set file upload limits
- [ ] Configure CORS for presigned URLs

## API Routes

### Upload Endpoints
- `POST /api/upload/presign` - Get presigned URL
- `POST /api/upload/complete` - Notify upload completion
- `GET /api/upload/[id]` - Get upload status

### Analysis Endpoints
- `POST /api/analyze` - Trigger image analysis
- `GET /api/results` - List analysis results
- `GET /api/results/[id]` - Get specific result

### Report Endpoints
- `POST /api/reports/generate` - Generate report
- `POST /api/reports/schedule` - Schedule recurring report
- `GET /api/reports/[id]` - Download report

### Advisor Endpoints
- `POST /api/advisor/ask` - Ask AI advisor
- `GET /api/advisor/faqs` - Get FAQs

## Performance Optimization

### Image Upload
- Use presigned URLs for direct cloud uploads
- Implement client-side compression
- Calculate hashes for deduplication
- Show upload progress with XHR

### Analysis Processing
- Use job queue for batch processing
- Implement result caching with Redis
- Use database indexes on frequently queried fields

### Report Generation
- Generate reports asynchronously
- Store generated reports in cloud storage
- Use CDN for report downloads

## Security Considerations

1. **File Upload Security:**
   - Validate file types and sizes
   - Scan for malware
   - Use presigned URLs with expiration
   - Implement rate limiting

2. **API Security:**
   - Use authentication middleware
   - Implement CSRF protection
   - Validate all inputs
   - Use HTTPS only

3. **Data Privacy:**
   - Encrypt sensitive data at rest
   - Use signed URLs for downloads
   - Implement access controls
   - Log all data access

## Troubleshooting

### Common Issues

**Upload Fails:**
- Check presigned URL expiration
- Verify cloud storage credentials
- Check file size limits
- Verify CORS configuration

**AI Advisor Not Responding:**
- Verify Google AI API key
- Check API rate limits
- Review error logs
- Test with simpler queries

**Reports Not Generating:**
- Check PDF generator installation
- Verify write permissions
- Check available disk space
- Review error logs

## Next Steps

1. **Implement Batch History**: Track and display bulk upload jobs
2. **Add Rule Engine**: Create rules for automated actions
3. **Build Simulation Mode**: Test AI on sample data
4. **Quality Insights**: Compute image quality metrics
5. **Notification System**: In-app and email notifications

## Support

For issues or questions:
- Check documentation at `/docs`
- Use AI Advisor for in-app help
- Contact support@chiptocrop.com

## License

Copyright © 2025 Chip to Crop. All rights reserved.
