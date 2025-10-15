# 🤖 Complete AI Build Prompt for AgroGrade Insights

## **Project Overview Prompt**

Build a comprehensive AI-powered agricultural platform called **AgroGrade Insights** - a professional tomato detection and grading system with real-time camera analysis, AI advisory, and analytics dashboard. The application should have a classic, corporate UI/UX with enterprise-grade production features.

---

## 📋 **COMPLETE BUILD PROMPT**

```
Create a production-ready Next.js web application for agricultural tomato detection and grading with the following specifications:

═══════════════════════════════════════════════════════════════════════════════
PART 1: PROJECT FOUNDATION
═══════════════════════════════════════════════════════════════════════════════

PROJECT NAME: AgroGrade Insights
TAGLINE: AI-Powered Tomato Detection & Grading System

TECH STACK:
- Framework: Next.js 15.1.3 (App Router)
- Language: TypeScript 5.x
- UI: React 19 with Tailwind CSS 3.4
- Styling: shadcn/ui components
- AI: Google Gemini API (generative AI)
- Detection: MMDetection v3 (Python backend)
- State Management: React Hooks
- Icons: Lucide React
- Charts: Recharts
- Fonts: Merriweather (serif) + Open Sans (sans-serif)

═══════════════════════════════════════════════════════════════════════════════
PART 2: DESIGN SYSTEM - CLASSIC PROFESSIONAL UI
═══════════════════════════════════════════════════════════════════════════════

DESIGN PHILOSOPHY:
Create a classic, corporate, professional design that feels like an enterprise business application from established companies. Avoid modern minimalism - embrace bold, structured, traditional UI patterns.

COLOR PALETTE:
Primary: Navy Blue (#1a4fd4, hsl(221, 83%, 53%))
- Primary Dark: #1440b4
- Primary Light: #4070e8

Secondary: Professional Gray
- Gray 50: #f8f9fa
- Gray 100: #e9ecef
- Gray 200: #dee2e6
- Gray 700: #495057
- Gray 900: #212529

Accent Colors:
- Success Green: #28a745 (emerald-600)
- Warning Amber: #fbbf24 (amber-400)
- Danger Red: #dc3545 (red-600)
- Info Blue: #17a2b8

Background:
- Main: #f8f9fa (light gray)
- Card: #ffffff
- Border: #dee2e6

TYPOGRAPHY:
- Headings: Merriweather (serif, 700 weight)
- Body: Open Sans (sans-serif, 400 regular, 600 semi-bold)
- Font sizes: 14px base, 18px-32px headings

VISUAL STYLE:
- Border radius: 4px (sharp, minimal rounding)
- Borders: 2px solid (bold, prominent)
- Shadows: Strong, pronounced box-shadows
- Spacing: Generous padding (16px-24px)
- Buttons: Bold borders, strong hover states
- Cards: White backgrounds with strong borders
- Tables: Striped rows, bold headers
- Inputs: Classic form styling with clear borders

UI COMPONENTS STYLE:
1. Buttons:
   - Primary: Navy blue background, white text, 2px border, bold font
   - Secondary: White background, navy border, navy text
   - Hover: Darker shade with transform scale
   - Padding: 12px 24px
   - Font weight: 600

2. Cards:
   - White background
   - 2px solid border (#dee2e6)
   - Strong box-shadow (0 2px 8px rgba(0,0,0,0.1))
   - 16px padding
   - 4px border radius

3. Headers:
   - Bold navy blue background
   - White text
   - Strong shadow (0 2px 8px rgba(0,0,0,0.15))
   - 80px height
   - Two-line layout: main title + subtitle

4. Sidebar:
   - White background with border
   - Logo in colored square (navy blue background)
   - Two-line branding: "AgroGrade" + "Insights"
   - Bold navigation items
   - Active state: navy background + white text

5. Tables:
   - Striped rows (alternating gray background)
   - Bold headers (navy background, white text)
   - 2px borders
   - Clear cell padding (12px)

6. Forms:
   - Clear labels (bold, 14px)
   - Input borders: 2px solid gray
   - Focus: Navy blue border
   - Helper text in gray
   - Error states: Red border + red text

7. Statistics Cards:
   - Large bold numbers (32px, serif font)
   - Clear labels below
   - Color-coded borders (success/warning/danger)
   - Icon + number + label layout

═══════════════════════════════════════════════════════════════════════════════
PART 3: APPLICATION FEATURES
═══════════════════════════════════════════════════════════════════════════════

CORE FUNCTIONALITY:

1. DASHBOARD (/)
   - Welcome hero section with gradient background
   - 4 statistic cards:
     * Total Detections (all-time count)
     * Tomatoes Detected (with icon)
     * Average Quality Score (percentage)
     * Detection Accuracy (percentage)
   - Recent detections table:
     * Image thumbnail
     * Timestamp
     * Detections count
     * Quality badge (Excellent/Good/Fair)
     * View details button
   - Quick actions cards:
     * Upload Images
     * Live Camera
     * AI Advisor
     * View Analytics

2. UPLOAD PAGE (/upload)
   - Drag & drop zone (large, prominent)
   - File input button
   - Preview selected images (grid layout)
   - Bulk upload support (multiple files)
   - Upload progress bars
   - Detection results display:
     * Original image
     * Detected tomatoes count
     * Bounding boxes overlay
     * Quality grades per tomato
     * Confidence scores
     * Download results button
   - Clear and reupload functionality

3. LIVE CAMERA ANALYZER (/live-camera)
   - Camera stream display (large viewport)
   - Start/Stop camera controls
   - Real-time detection overlay
   - Live statistics panel:
     * Current detections count
     * Active detection rate
     * Session duration
     * Average confidence
   - Detection history sidebar:
     * Timestamped snapshots
     * Quick stats per frame
     * Color-coded quality indicators
   - Capture snapshot button
   - Save session data
   - Camera settings (resolution, FPS)

4. AI ADVISOR (/ai-advisor)
   - Chat interface with Google Gemini
   - Context-aware responses about:
     * Tomato diseases
     * Growing tips
     * Detection results interpretation
     * Quality improvement advice
     * Pest management
     * Harvesting guidance
   - Conversation history
   - Suggested questions chips
   - Image upload for analysis
   - Copy response button
   - Clear chat functionality
   - Professional message bubbles

5. ANALYTICS DASHBOARD (/analytics)
   - Date range selector
   - Key metrics cards:
     * Total sessions
     * Total detections
     * Average quality
     * Detection trends
   - Charts:
     * Detections over time (line chart)
     * Quality distribution (pie chart)
     * Detection accuracy (bar chart)
     * Hourly activity (area chart)
   - Export data button (CSV/JSON)
   - Filter options:
     * Date range
     * Quality grade
     * Confidence threshold
   - Detailed data table with sorting

6. DETECTION HISTORY (/history)
   - Searchable history table
   - Filters:
     * Date range
     * Quality grade
     * Detection count
     * Source (upload/camera)
   - Sortable columns:
     * Timestamp
     * Detections count
     * Quality score
     * Confidence
   - Pagination
   - View details modal
   - Delete functionality
   - Bulk actions

7. SETTINGS (/settings)
   - General settings:
     * App name configuration
     * Theme preferences
     * Language selection
   - Detection settings:
     * Confidence threshold slider
     * Detection model version
     * Overlay preferences
   - Camera settings:
     * Default resolution
     * FPS settings
     * Auto-capture interval
   - API configuration:
     * Google Gemini API key
     * Python backend URL
     * Connection testing
   - Data management:
     * Export all data
     * Clear history
     * Database backup
   - Account settings:
     * Profile information
     * Notification preferences

═══════════════════════════════════════════════════════════════════════════════
PART 4: TECHNICAL ARCHITECTURE
═══════════════════════════════════════════════════════════════════════════════

FOLDER STRUCTURE:
```
src/
├── app/
│   ├── layout.tsx (root layout, fonts, metadata)
│   ├── page.tsx (dashboard)
│   ├── error.tsx (error boundary)
│   ├── loading.tsx (loading state)
│   ├── not-found.tsx (404 page)
│   ├── globals.css (design system)
│   ├── upload/page.tsx
│   ├── live-camera/page.tsx
│   ├── ai-advisor/page.tsx
│   ├── analytics/page.tsx
│   ├── history/page.tsx
│   ├── settings/page.tsx
│   └── api/
│       ├── tomatoes/
│       │   └── detect/route.ts (detection endpoint)
│       └── chat/route.ts (AI chat endpoint)
├── components/
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── app-sidebar.tsx
│   │   ├── sidebar-provider.tsx
│   │   └── footer.tsx
│   ├── dashboard/
│   │   ├── stat-card.tsx
│   │   ├── recent-detections.tsx
│   │   ├── quick-actions.tsx
│   │   └── live-camera-analyzer.tsx
│   ├── upload/
│   │   ├── upload-zone.tsx
│   │   ├── image-preview.tsx
│   │   └── detection-results.tsx
│   ├── analytics/
│   │   ├── charts.tsx
│   │   ├── metrics-grid.tsx
│   │   └── data-export.tsx
│   └── ui/ (shadcn components)
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── dialog.tsx
│       ├── badge.tsx
│       ├── table.tsx
│       └── ... (other shadcn components)
├── lib/
│   ├── utils.ts (utility functions)
│   ├── performance.ts (web vitals tracking)
│   └── db.ts (database helpers)
├── hooks/
│   ├── use-camera.ts
│   ├── use-detection.ts
│   └── use-ai-chat.ts
└── ai/
    └── config.ts (AI configuration)

public/
├── robots.txt
├── manifest.json
└── icons/ (favicon, PWA icons)

LaboroTomato/ (Python detection backend)
├── tomato_inference.py (detection script)
├── models/
│   └── laboro_tomato_48ep.pth
└── config_example/
```

API ROUTES:

1. POST /api/tomatoes/detect
   - Input: FormData with image file
   - Process: 
     * Save uploaded image
     * Call Python detection script
     * Parse detection results (bounding boxes, confidence, quality)
   - Output: JSON with detections array
   - Example response:
     ```json
     {
       "success": true,
       "detections": [
         {
           "bbox": [x1, y1, x2, y2],
           "confidence": 0.95,
           "class": "b_fully_ripened",
           "quality": "Excellent"
         }
       ],
       "totalDetections": 5,
       "averageConfidence": 0.92,
       "imageUrl": "/uploads/image123.jpg"
     }
     ```

2. POST /api/chat
   - Input: JSON with message and optional context
   - Process:
     * Initialize Google Gemini model
     * Include system prompt for agricultural expertise
     * Send user message with context
     * Stream response
   - Output: Streaming text response
   - Context includes detection results when relevant

DATABASE SCHEMA (if using):
```sql
-- Detections table
CREATE TABLE detections (
  id INTEGER PRIMARY KEY,
  image_path TEXT,
  timestamp DATETIME,
  total_detections INTEGER,
  average_confidence REAL,
  quality_score TEXT,
  detection_data JSON,
  source TEXT -- 'upload' or 'camera'
);

-- Sessions table
CREATE TABLE sessions (
  id INTEGER PRIMARY KEY,
  start_time DATETIME,
  end_time DATETIME,
  total_frames INTEGER,
  total_detections INTEGER,
  session_data JSON
);

-- Chat history table
CREATE TABLE chat_history (
  id INTEGER PRIMARY KEY,
  timestamp DATETIME,
  user_message TEXT,
  ai_response TEXT,
  context JSON
);
```

PYTHON DETECTION BACKEND:

File: LaboroTomato/tomato_inference.py
- Uses MMDetection v3 framework
- Model: Laboro Tomato 48-epoch trained model
- Classes detected:
  * b_fully_ripened (red, ripe)
  * b_half_ripened (orange, turning)
  * b_green (unripe)
  * l_fully_ripened (ripe with leaf)
  * l_half_ripened (turning with leaf)
  * l_green (green with leaf)
- Output: JSON with bounding boxes, confidence scores, class labels
- Quality mapping:
  * Fully ripened → Excellent (90-100%)
  * Half ripened → Good (70-89%)
  * Green → Fair (50-69%)

Installation:
```bash
cd LaboroTomato
pip install mmdet==3.x mmcv openmim
mim install mmengine
python tomato_inference.py --image path/to/image.jpg --output results.json
```

═══════════════════════════════════════════════════════════════════════════════
PART 5: KEY COMPONENTS CODE STRUCTURE
═══════════════════════════════════════════════════════════════════════════════

HEADER COMPONENT (src/components/layout/header.tsx):
- Height: 80px
- Background: Navy blue (#1a4fd4)
- Shadow: 0 2px 8px rgba(0,0,0,0.15)
- Layout: Two-line text + user menu
  * Line 1: "AgroGrade Insights" (24px, bold, serif)
  * Line 2: "AI-Powered Tomato Detection & Grading" (14px, normal)
- Right side: User avatar + dropdown menu
- Sticky positioning
- White text throughout

SIDEBAR (src/components/layout/app-sidebar.tsx):
- Width: 260px
- Background: White with right border
- Logo section:
  * Navy blue square (48x48px)
  * Leaf icon in white
  * Two lines of text: "AgroGrade" + "Insights"
- Navigation items:
  * Dashboard (LayoutDashboard icon)
  * Upload (Upload icon)
  * Live Camera (Video icon)
  * AI Advisor (Brain icon)
  * Analytics (BarChart3 icon)
  * History (History icon)
  * Settings (Settings icon)
- Active state: Navy background, white text
- Hover state: Light gray background
- Bold font weights (600)

LIVE CAMERA ANALYZER (src/components/dashboard/live-camera-analyzer.tsx):
- Video stream: 640x480px default
- Controls bar:
  * Start/Stop button (toggle)
  * Snapshot button
  * Settings button
- Statistics panel (right side):
  * 4 stat cards:
    - Detections: Bold number (32px) + label
    - Detection rate: Percentage
    - Session time: MM:SS format
    - Avg confidence: Percentage
  * Color-coded borders (green/amber/blue)
- Detection overlay:
  * Canvas element over video
  * Draw bounding boxes (2px width)
  * Color-coded by quality:
    - Excellent: Green (#28a745)
    - Good: Amber (#fbbf24)
    - Fair: Red (#dc3545)
  * Label with class + confidence

STAT CARD (src/components/dashboard/stat-card.tsx):
- White background
- 2px border (color-coded)
- Strong shadow
- Layout:
  * Top: Icon (large, color-coded)
  * Middle: Number (32px, bold, serif)
  * Bottom: Label (14px, gray)
- Hover effect: Slight lift
- Variants: success (green), warning (amber), info (blue), danger (red)

DETECTION RESULTS DISPLAY:
- Grid layout (2 columns on desktop)
- Original image + annotated image
- Detection list:
  * Each detection card shows:
    - Thumbnail (cropped from bbox)
    - Class label
    - Confidence percentage
    - Quality badge
    - Coordinates
- Summary statistics:
  * Total detections
  * Quality breakdown (pie chart)
  * Average confidence
- Download button (JSON + annotated image)

AI CHAT INTERFACE:
- Two-column layout:
  * Left: Chat messages (scrollable)
  * Right: Suggested questions + context
- Message bubble styling:
  * User: Right-aligned, navy background, white text
  * AI: Left-aligned, gray background, black text
  * Timestamp below each message
- Input area:
  * Text field with auto-resize
  * Send button
  * Image upload button
  * Character count
- Suggested questions:
  * Chips with common queries
  * Click to populate input
  * Categories: Diseases, Growing, Quality, General

═══════════════════════════════════════════════════════════════════════════════
PART 6: PRODUCTION FEATURES
═══════════════════════════════════════════════════════════════════════════════

SECURITY HEADERS (next.config.js):
```javascript
headers: [
  {
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "X-DNS-Prefetch-Control": "on"
  }
]
```

PERFORMANCE OPTIMIZATIONS:
- Image optimization: WebP, AVIF formats
- Code splitting: Dynamic imports for heavy components
- Font optimization: Google Fonts with display swap
- Compression: Gzip/Brotli enabled
- Tree shaking: Remove unused code
- Lazy loading: Images and components
- Caching: Aggressive caching strategies
- CDN: Static assets on CDN

ERROR HANDLING:
- Global error boundary (error.tsx)
- API error responses (try-catch blocks)
- User-friendly error messages
- Error logging to console (dev) or service (prod)
- Fallback UI for failed components
- Retry mechanisms for network failures

LOADING STATES:
- Skeleton screens for data loading
- Spinner for processing
- Progress bars for uploads
- Shimmer effects for cards
- Suspense boundaries
- Loading.tsx for route transitions

SEO OPTIMIZATION:
- Complete metadata (title, description, keywords)
- Open Graph tags (og:title, og:image, og:description)
- Twitter Cards
- Canonical URLs
- robots.txt (allow crawlers)
- Sitemap generation
- Structured data (JSON-LD)

PWA SUPPORT (manifest.json):
```json
{
  "name": "AgroGrade Insights",
  "short_name": "AgroGrade",
  "description": "AI-Powered Tomato Detection & Grading System",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#1a4fd4",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

MONITORING & ANALYTICS:
- Web Vitals tracking (CLS, FID, FCP, LCP, TTFB)
- Custom performance markers
- API response time tracking
- Error rate monitoring
- User analytics integration ready
- Console logging (development only)

═══════════════════════════════════════════════════════════════════════════════
PART 7: ENVIRONMENT CONFIGURATION
═══════════════════════════════════════════════════════════════════════════════

ENVIRONMENT VARIABLES (.env):
```bash
# Required
GOOGLE_GENAI_API_KEY=your_google_gemini_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Python Backend
PYTHON_DETECTION_SCRIPT=./LaboroTomato/tomato_inference.py
PYTHON_MODEL_PATH=./LaboroTomato/models/laboro_tomato_48ep.pth

# Optional
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
NEXT_PUBLIC_ENABLE_EXPERIMENTAL=false

# Production
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-domain.com
```

DEPENDENCIES (package.json):
```json
{
  "dependencies": {
    "next": "15.1.3",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5.0.0",
    "@google/generative-ai": "latest",
    "tailwindcss": "^3.4.0",
    "lucide-react": "latest",
    "recharts": "^2.x",
    "clsx": "latest",
    "class-variance-authority": "latest",
    "tailwind-merge": "latest",
    "web-vitals": "latest"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "15.1.3",
    "autoprefixer": "^10.0.0",
    "postcss": "^8.0.0"
  }
}
```

═══════════════════════════════════════════════════════════════════════════════
PART 8: USER WORKFLOWS
═══════════════════════════════════════════════════════════════════════════════

WORKFLOW 1: Upload & Detect
1. User navigates to /upload
2. User drags images or clicks to browse
3. Selected images show in preview grid
4. User clicks "Upload & Detect" button
5. Progress bars show upload progress
6. Images sent to /api/tomatoes/detect
7. API saves images and calls Python script
8. Python script runs detection and returns JSON
9. Results displayed with annotated images
10. User can download results or detect more

WORKFLOW 2: Live Camera Detection
1. User navigates to /live-camera
2. User clicks "Start Camera" button
3. Browser requests camera permission
4. Video stream displays in viewport
5. User clicks "Start Detection" button
6. Every frame (or interval) sent to detection API
7. Bounding boxes drawn on canvas overlay
8. Statistics update in real-time
9. User can capture snapshots
10. User stops detection and saves session

WORKFLOW 3: AI Advisory
1. User navigates to /ai-advisor
2. User types question or clicks suggested question
3. Optional: User uploads image for context
4. Message sent to /api/chat
5. Gemini processes with agricultural context
6. Response streams back to UI
7. User can ask follow-up questions
8. Conversation history maintained
9. User can copy responses
10. User can clear chat and start fresh

WORKFLOW 4: Analytics Review
1. User navigates to /analytics
2. Dashboard loads with default date range (last 30 days)
3. Key metrics cards display summary
4. Charts render with detection data
5. User adjusts date range or filters
6. Charts update dynamically
7. User explores different chart types
8. User clicks "Export Data" for CSV/JSON
9. User reviews detailed data table
10. User can drill down into specific sessions

═══════════════════════════════════════════════════════════════════════════════
PART 9: QUALITY REQUIREMENTS
═══════════════════════════════════════════════════════════════════════════════

PERFORMANCE TARGETS:
- Lighthouse Performance: > 90
- Lighthouse Accessibility: > 95
- Lighthouse Best Practices: > 95
- Lighthouse SEO: 100
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- First Input Delay (FID): < 100ms
- Time to Interactive (TTI): < 3.5s

BROWSER SUPPORT:
- Chrome: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- Edge: Last 2 versions
- Mobile browsers: iOS Safari, Chrome Android

RESPONSIVE BREAKPOINTS:
- Mobile: 320px - 640px
- Tablet: 641px - 1024px
- Desktop: 1025px - 1920px
- Large: 1921px+

ACCESSIBILITY (WCAG AA):
- Color contrast: Minimum 4.5:1 for text
- Keyboard navigation: All interactive elements
- Screen reader: Proper ARIA labels
- Focus indicators: Visible focus states
- Alt text: All images
- Form labels: Associated with inputs
- Heading hierarchy: Proper H1-H6 structure

CODE QUALITY:
- TypeScript: Strict mode enabled
- ESLint: No errors, minimal warnings
- Formatting: Prettier configured
- Comments: JSDoc for complex functions
- Naming: Clear, descriptive variable names
- DRY: No repeated code blocks
- Modularity: Single responsibility principle

TESTING (Optional but recommended):
- Unit tests: Jest + React Testing Library
- Integration tests: API route testing
- E2E tests: Playwright or Cypress
- Visual regression: Chromatic or Percy
- Coverage: > 70% code coverage

═══════════════════════════════════════════════════════════════════════════════
PART 10: DEPLOYMENT INSTRUCTIONS
═══════════════════════════════════════════════════════════════════════════════

BUILD COMMANDS:
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run type-check

# Full production pipeline
npm run prod
```

VERCEL DEPLOYMENT:
1. Connect GitHub repository
2. Set environment variables in Vercel dashboard
3. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
   - Install command: `npm install`
4. Deploy automatically on git push
5. Custom domain configuration
6. Enable analytics and monitoring

DOCKER DEPLOYMENT:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

ENVIRONMENT CHECKLIST:
- [ ] Set GOOGLE_GENAI_API_KEY
- [ ] Set NEXT_PUBLIC_APP_URL
- [ ] Configure Python backend path
- [ ] Set up SSL certificate
- [ ] Enable HTTPS redirect
- [ ] Configure CSP headers
- [ ] Set up monitoring (optional)
- [ ] Configure analytics (optional)
- [ ] Test all API endpoints
- [ ] Verify camera permissions

═══════════════════════════════════════════════════════════════════════════════
PART 11: SPECIAL REQUIREMENTS & DETAILS
═══════════════════════════════════════════════════════════════════════════════

CAMERA HANDLING:
- Request getUserMedia permissions
- Handle permission denial gracefully
- Support multiple camera selection
- Display camera not available message
- Fallback to upload if camera fails
- Stop camera stream on page leave
- Handle camera errors (busy, not found)

IMAGE PROCESSING:
- Accept formats: JPG, PNG, WebP
- Max file size: 10MB per image
- Resize large images before upload
- Maintain aspect ratio
- Generate thumbnails for gallery
- Compress images for storage
- Clean up temporary files

DETECTION VISUALIZATION:
- Draw bounding boxes with 2px width
- Color-code boxes by quality:
  * Green: Excellent (fully ripened)
  * Amber: Good (half ripened)
  * Red: Fair (green)
- Display confidence score above box
- Show class label below box
- Semi-transparent overlay for better visibility
- Zoom into detection on click

AI CONTEXT AWARENESS:
- Include recent detection results in chat context
- Provide agricultural expertise in system prompt
- Offer actionable advice
- Format responses with markdown
- Include bullet points and lists
- Cite best practices
- Avoid medical or chemical advice without disclaimers

DATA PERSISTENCE:
- Store detections in local database (SQLite or similar)
- Save uploaded images in /uploads directory
- Maintain chat history
- Export functionality for all data
- Cleanup old data (configurable retention)
- Backup data before clearing

NOTIFICATION SYSTEM (Future):
- Toast notifications for actions
- Success: Green background
- Error: Red background
- Warning: Amber background
- Info: Blue background
- Auto-dismiss after 5 seconds
- Close button on each toast

═══════════════════════════════════════════════════════════════════════════════
PART 12: IMPORTANT IMPLEMENTATION NOTES
═══════════════════════════════════════════════════════════════════════════════

1. Google Fonts Integration:
   - Add to layout.tsx: `import { Merriweather, Open_Sans } from 'next/font/google'`
   - Configure: `const merriweather = Merriweather({ weight: ['700'], subsets: ['latin'] })`
   - Apply: Use CSS variables `--font-merriweather` and `--font-open-sans`

2. Python Backend Connection:
   - Use child_process.spawn() to execute Python script
   - Pass image path as command line argument
   - Parse JSON output from stdout
   - Handle Python errors from stderr
   - Set timeout for detection (30 seconds)

3. Gemini AI Configuration:
   - Initialize: `const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY)`
   - Model: `genAI.getGenerativeModel({ model: "gemini-1.5-flash" })`
   - System prompt: Include agricultural expertise and context
   - Stream responses: Use `generateContentStream()`

4. Canvas Drawing:
   - Get canvas context: `canvas.getContext('2d')`
   - Match canvas size to video size
   - Clear canvas before each frame: `ctx.clearRect(0, 0, width, height)`
   - Draw boxes: `ctx.strokeRect(x1, y1, width, height)`
   - Draw text: `ctx.fillText(label, x, y)`

5. File Upload Handling:
   - Use FormData for multipart upload
   - Generate unique filenames (timestamp + random)
   - Save to /public/uploads directory
   - Return public URL path
   - Clean up old uploads periodically

6. Responsive Design:
   - Mobile: Stack components vertically
   - Hide sidebar on mobile, use hamburger menu
   - Reduce header height on mobile (60px)
   - Adjust font sizes for readability
   - Touch-friendly button sizes (44x44px minimum)
   - Swipe gestures for image gallery

7. State Management:
   - Use React hooks (useState, useEffect, useCallback)
   - Context for global state (detection history, settings)
   - Local storage for persisted preferences
   - Session storage for temporary data
   - URL params for shareable states

8. Error Messages:
   - User-friendly language (avoid technical jargon)
   - Suggest solutions when possible
   - Provide contact support option
   - Log detailed errors for debugging
   - Display error ID for support reference

═══════════════════════════════════════════════════════════════════════════════
END OF BUILD PROMPT
═══════════════════════════════════════════════════════════════════════════════

SUMMARY:
Create a professional, production-ready agricultural platform with classic corporate UI, 
real-time tomato detection using MMDetection, Google Gemini AI advisory, comprehensive 
analytics, and enterprise-grade features including security headers, error handling, 
performance monitoring, SEO optimization, and PWA support. The design should be bold, 
structured, and professional with navy blue primary color, serif headings, sharp corners, 
and strong borders throughout.

EXPECTED DELIVERABLES:
✅ Fully functional Next.js application
✅ Classic professional UI with navy blue theme
✅ Upload and live camera detection
✅ AI chat advisor with Gemini
✅ Analytics dashboard with charts
✅ Detection history and management
✅ Settings and configuration
✅ Python detection backend integration
✅ Production-ready with security headers
✅ SEO optimized with PWA support
✅ Error handling and loading states
✅ Responsive design (mobile/tablet/desktop)
✅ Complete documentation
✅ Deployment ready (Vercel/Netlify/Docker)

TARGET COMPLETION TIME: 4-6 hours for experienced AI
COMPLEXITY LEVEL: Advanced (Full-stack with AI integration)
PRIORITY: Production quality over speed
```

---

## 🎯 **How to Use This Prompt**

### **For AI Coding Assistants (Claude, GPT-4, Copilot):**

1. **Copy the entire prompt** from the code block above
2. **Paste into your AI assistant** (Claude, ChatGPT, etc.)
3. **Add**: "Build this application step by step, starting with project setup"
4. **AI will guide you** through the entire implementation

### **For AI Code Generators (v0, Bolt, Replit):**

1. **Use the prompt** in sections:
   - Part 1-2: Project foundation and design system
   - Part 3-4: Features and architecture
   - Part 5-6: Components and production features
   - Part 7-12: Configuration and implementation

2. **Generate incrementally**:
   - First: Basic structure and design system
   - Second: Core pages (dashboard, upload)
   - Third: Advanced features (live camera, AI)
   - Fourth: Production features and optimization

### **For Human Developers:**

Use this as a **comprehensive specification document**:
- ✅ Complete feature list
- ✅ Design system guide
- ✅ Technical requirements
- ✅ Code structure
- ✅ Quality benchmarks
- ✅ Deployment instructions

---

## 📝 **Customization Options**

You can modify the prompt by adding:

```
ADDITIONAL REQUIREMENTS:
- Add authentication with [Auth0/NextAuth/Clerk]
- Use [PostgreSQL/MongoDB/Supabase] instead of SQLite
- Add [Stripe/PayPal] payment integration
- Support multiple languages [i18n]
- Add dark mode toggle
- Include admin dashboard
- Add email notifications
- Support team collaboration
- Add API rate limiting
- Include webhook support
```

---

## 🚀 **Quick Start Commands**

After AI generates the code:

```bash
# 1. Create project directory
mkdir agrograde-insights
cd agrograde-insights

# 2. Initialize Next.js (if not done by AI)
npx create-next-app@latest . --typescript --tailwind --app

# 3. Install dependencies
npm install

# 4. Set up environment variables
cp .env.example .env
# Add your GOOGLE_GENAI_API_KEY

# 5. Run development server
npm run dev

# 6. Open browser
http://localhost:3000
```

---

## 📚 **Supporting Documentation**

After building with AI, you'll have:

1. **README.md** - Project overview and setup
2. **DEPLOYMENT_GUIDE.md** - Platform-specific deployment
3. **API_KEYS_GUIDE.md** - Getting API keys
4. **CLASSIC_UI_DESIGN.md** - Design system reference
5. **PRODUCTION_READY.md** - Feature checklist

---

## ✨ **Expected Output Quality**

The AI should produce:

- ✅ **Clean TypeScript code** with proper types
- ✅ **Responsive design** that works on all devices
- ✅ **Accessible components** (WCAG AA compliant)
- ✅ **Optimized performance** (Lighthouse > 90)
- ✅ **Production-ready** with security features
- ✅ **Well-documented** code with comments
- ✅ **Error handling** throughout
- ✅ **Professional UI** matching the design system

---

## 🔧 **Troubleshooting AI Generation**

If AI struggles with any part:

1. **Break it down**: Ask for one feature at a time
2. **Provide examples**: Show similar component structure
3. **Reference docs**: Point to Next.js/React docs
4. **Iterate**: Ask for improvements and refinements
5. **Test frequently**: Verify each feature works before moving on

---

## 💡 **Pro Tips for AI Generation**

1. **Start with UI**: Get the visual design right first
2. **Mock data initially**: Don't wait for backend
3. **Test incrementally**: Verify each feature works
4. **Use TypeScript**: Helps AI generate better code
5. **Ask for explanations**: Understand what AI creates
6. **Request tests**: Ask AI to write test cases
7. **Optimize later**: Functionality first, optimization second

---

## 🎓 **Learning Resources**

Share these with the AI if it needs references:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Google Gemini API](https://ai.google.dev/docs)
- [MMDetection](https://mmdetection.readthedocs.io)
- [React Documentation](https://react.dev)

---

## ✅ **Verification Checklist**

After AI completes the build:

- [ ] All pages load without errors
- [ ] Navigation works correctly
- [ ] Upload detection works
- [ ] Live camera (if camera available)
- [ ] AI chat responds
- [ ] Analytics displays data
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] Lighthouse score > 90
- [ ] Production build succeeds

---

**🎉 This prompt contains everything needed to build the complete AgroGrade Insights platform!**

*Total specification: ~2000 lines of detailed requirements, design system, architecture, and implementation guidance.*
