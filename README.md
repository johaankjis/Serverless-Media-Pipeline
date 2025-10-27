# Serverless Media Pipeline

A modern, serverless media processing pipeline built with Next.js 16, React 19, and TypeScript. This application provides a real-time interface for uploading, processing, and monitoring media files with automatic transcoding and optimization.

## 🚀 Features

- **Drag & Drop Upload**: Intuitive file upload interface with drag-and-drop support
- **Real-time Processing**: Live job status updates with progress tracking
- **System Metrics**: Monitor success rates, processing times, and system performance
- **Queue Management**: Track pending, processing, and failed jobs with dead letter queue (DLQ) support
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Type-safe**: Full TypeScript support for better developer experience

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18.x or higher
- pnpm (recommended) or npm

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/johaankjis/Serverless-Media-Pipeline.git
cd Serverless-Media-Pipeline
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

## 🚦 Getting Started

### Development Mode

Run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build for Production

```bash
pnpm build
# or
npm run build
```

### Start Production Server

```bash
pnpm start
# or
npm start
```

### Linting

```bash
pnpm lint
# or
npm run lint
```

## 📁 Project Structure

```
Serverless-Media-Pipeline/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   │   ├── jobs/            # Job listing endpoint
│   │   ├── metrics/         # System metrics endpoint
│   │   ├── notify/          # Notification endpoint
│   │   ├── process/         # Processing job endpoint
│   │   ├── queue/           # Queue status endpoint
│   │   └── upload/          # File upload endpoint
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── processing-jobs.tsx  # Job list component
│   ├── queue-status.tsx     # Queue monitoring component
│   ├── system-metrics.tsx   # Metrics dashboard component
│   ├── theme-provider.tsx   # Theme provider
│   └── upload-zone.tsx      # File upload component
├── hooks/                   # Custom React hooks
│   ├── use-mobile.ts       # Mobile detection hook
│   └── use-toast.ts        # Toast notifications hook
├── lib/                    # Utility functions
│   └── utils.ts           # Helper utilities
├── public/                # Static assets
├── styles/                # Additional styles
├── components.json        # shadcn/ui configuration
├── next.config.mjs       # Next.js configuration
├── package.json          # Project dependencies
├── postcss.config.mjs    # PostCSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 🏗️ Architecture

### Frontend
- **Framework**: Next.js 16 with App Router
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4.x with shadcn/ui components
- **Type Safety**: TypeScript 5
- **State Management**: React hooks (useState, useEffect)
- **Icons**: Lucide React

### API Routes

#### Upload Endpoint (`/api/upload`)
- **Method**: POST
- **Description**: Handles file uploads and triggers processing
- **Request**: FormData with file
- **Response**: File metadata and upload confirmation

#### Process Endpoint (`/api/process`)
- **Method**: POST
- **Description**: Creates and manages processing jobs
- **Request**: JSON with fileId and filename
- **Response**: Job details with status and progress

#### Jobs Endpoint (`/api/jobs`)
- **Method**: GET
- **Description**: Returns list of all processing jobs
- **Response**: Array of job objects with status

#### Metrics Endpoint (`/api/metrics`)
- **Method**: GET
- **Description**: Provides system performance metrics
- **Response**: Success rate, processing time, total processed, failed jobs

#### Queue Status Endpoint (`/api/queue/status`)
- **Method**: GET
- **Description**: Returns current queue state
- **Response**: Pending, processing, and DLQ counts

#### Notify Endpoint (`/api/notify`)
- **Method**: POST
- **Description**: Handles job completion notifications
- **Request**: JSON with jobId, filename, and status

## 🎨 UI Components

### Upload Zone
- Drag-and-drop file upload interface
- File type validation (images and videos)
- Size limit: 100MB per file
- Multi-file upload support
- File preview and removal

### Processing Jobs
- Real-time job status updates
- Progress bars for active jobs
- Status indicators (pending, processing, completed, failed)
- Processing time display
- Timestamp formatting

### System Metrics
- Success rate percentage
- Average processing time
- Total processed files count
- Failed jobs in DLQ

### Queue Status
- Pending jobs visualization
- Active processing jobs
- Dead letter queue monitoring
- Visual progress bars

## 🔧 Configuration

### Next.js Configuration (`next.config.mjs`)
- TypeScript build errors ignored for development
- Image optimization disabled
- Ready for deployment

### TypeScript Configuration (`tsconfig.json`)
- Strict mode enabled
- Path aliases configured (`@/*`)
- ES6 target
- JSX preservation for Next.js

### Tailwind Configuration
- CSS variables for theming
- shadcn/ui integration
- Neutral base color
- Animation support

## 📦 Dependencies

### Core Dependencies
- **next**: 16.0.0 - React framework
- **react**: 19.2.0 - UI library
- **react-dom**: 19.2.0 - React DOM bindings
- **typescript**: ^5 - Type safety

### UI Components
- **@radix-ui/react-***: Accessible component primitives
- **lucide-react**: Icon library
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: CVA for component variants
- **tailwind-merge**: Utility for merging Tailwind classes

### Form & Validation
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Form validation resolvers
- **zod**: Schema validation

### Analytics
- **@vercel/analytics**: Analytics integration

## 🚀 Deployment

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy with default settings

Alternatively, deploy to any Node.js hosting platform that supports Next.js.

## 🔄 How It Works

1. **Upload**: Users drag and drop or select media files
2. **Storage**: Files are uploaded to simulated object storage
3. **Queue**: Processing jobs are added to the job queue
4. **Processing**: Jobs are processed asynchronously with progress updates
5. **Monitoring**: Real-time updates show job status and system metrics
6. **Completion**: Users receive notifications when processing completes

## 📊 Current Implementation

This is a demonstration/prototype implementation with:
- Simulated file storage (in-memory)
- Mock processing pipeline
- Simulated async job processing
- Demo metrics and queue status

For production use, integrate with:
- Cloud storage (AWS S3, Google Cloud Storage, Azure Blob Storage)
- Message queue service (AWS SQS, RabbitMQ, Redis)
- Media processing service (AWS MediaConvert, FFmpeg)
- Database for job persistence
- Real-time notifications (WebSockets, Server-Sent Events)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

Built by [johaankjis](https://github.com/johaankjis)

## 🔗 Links

- [Repository](https://github.com/johaankjis/Serverless-Media-Pipeline)
- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📝 Notes

- The application uses Next.js 16 with the App Router (canary/pre-release version)
- React 19.2.0 is used (latest version at project creation)
- React Server Components are utilized where appropriate
- All API routes are serverless functions
- The UI is fully responsive and accessible
- Analytics are integrated via Vercel Analytics

---

**Happy Processing! 🎬**
