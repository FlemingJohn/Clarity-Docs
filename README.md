# 📄 ClarityDocs: AI-Powered Document Simplification

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-orange?style=flat&logo=firebase)](https://firebase.google.com/)
[![Google AI](https://img.shields.io/badge/Google%20AI-Gemini-blue?style=flat&logo=google)](https://ai.google.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

> **Transform complex documents into crystal-clear insights with AI-powered analysis**

ClarityDocs is an intelligent document analysis platform that uses advanced AI to break down complex legal documents, contracts, and agreements into simple, actionable insights. Get risk assessments, interactive timelines, negotiation suggestions, and plain-language explanations instantly.

## ✨ Key Features

### 🤖 **AI-Powered Document Analysis**
- **Smart Summarization**: Generates structured summaries with key points, Do's, and Don'ts
- **Risk Assessment**: Calculate risk scores (0-100) with detailed positive/negative breakdowns
- **Tone Analysis**: Identifies friendly, neutral, or strict language patterns in clauses

### 📊 **Interactive Insights**
- **Timeline Extraction**: Automatically identifies and visualizes key dates, deadlines, and milestones  
- **Scenario Analysis**: Interactive "What-if" chat to explore document implications
- **Term Definitions**: Click any highlighted term for instant plain-language explanations

### 🔍 **Smart Document Processing**
- **Multi-format Support**: Upload PDFs, images (JPG, PNG) with OCR extraction
- **Text Input**: Paste document content directly for instant analysis
- **Document Type Detection**: Optimized analysis for rentals, loans, employment contracts, ToS

### 💬 **Negotiation Intelligence**
- **Negotiation Suggestions**: AI-generated talking points for unfavorable clauses
- **Real-world Examples**: "In Simple Terms" explanations with practical scenarios
- **Multi-language Support**: Translate summaries to Hindi, Tamil, Telugu, Malayalam

### 🔐 **Secure & User-Friendly**
- **Firebase Authentication**: Secure user accounts and session management
- **Privacy-First**: Documents processed securely with no permanent storage
- **Responsive Design**: Beautiful, mobile-friendly interface with dark/light themes

## 🎯 Perfect For

- **Renters**: Understanding lease agreements and rental contracts
- **Employees**: Reviewing employment contracts and workplace policies  
- **Small Businesses**: Analyzing supplier agreements and service contracts
- **Consumers**: Decoding terms of service and privacy policies
- **Students**: Learning from legal document structures and language

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm
- **Google Cloud Account** with enabled APIs:
  - Gemini API
  - Document AI API
  - Translation API
- **Firebase Project** with Authentication enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/joe-anidas/ClarityDocs.git
   cd ClarityDocs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:

   ```env
   # Public (client-side) - safe to expose
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key

   # Server-side (keep secret!)
   GEMINI_API_KEY=your_gemini_api_key
   GOOGLE_CLOUD_API_KEY=your_google_cloud_api_key

   # Google Cloud / Document AI
   GCLOUD_PROJECT=your_project_id
   DOCAI_PROCESSOR_ID=your_document_ai_processor_id
   DOCAI_LOCATION=us

   # Service account credentials (used by server-side code)
   GOOGLE_CLOUD_CLIENT_EMAIL=your_service_account_email

   # Private key (preserve newlines with \\n)
   GOOGLE_CLOUD_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nYOUR_PRIVATE_KEY_HERE\\n-----END PRIVATE KEY-----\\n"
   ```

4. **Start Development Servers**
   
   **Terminal 1: Next.js Frontend**
   ```bash
   npm run dev
   ```
   
   **Terminal 2: Genkit AI Server**
   ```bash
   npm run genkit:dev
   ```

5. **Access the Application**
   - Frontend: `http://localhost:9002`
   - Genkit UI: `http://localhost:4000` (optional)

## 🔧 Environment Variables Setup

### Required Environment Variables

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Web API Key (public) | Firebase Console → Project Settings → Web App |
| `GEMINI_API_KEY` | Google Gemini API Key | Google AI Studio → API Keys |
| `GOOGLE_CLOUD_API_KEY` | Google Cloud API Key | Google Cloud Console → APIs & Services → Credentials |
| `GCLOUD_PROJECT` | Google Cloud Project ID | Google Cloud Console → Project Info |
| `DOCAI_PROCESSOR_ID` | Document AI Processor ID | Google Cloud Console → Document AI |
| `DOCAI_LOCATION` | Document AI Location | Usually `us` or `eu` |
| `GOOGLE_CLOUD_CLIENT_EMAIL` | Service Account Email | Google Cloud Console → IAM → Service Accounts |
| `GOOGLE_CLOUD_PRIVATE_KEY` | Service Account Private Key | Service Account JSON file |

### Setting Up Google Cloud Services

1. **Create Google Cloud Project**
   ```bash
   gcloud projects create your-project-id
   gcloud config set project your-project-id
   ```

2. **Enable Required APIs**
   ```bash
   gcloud services enable aiplatform.googleapis.com
   gcloud services enable documentai.googleapis.com
   gcloud services enable translate.googleapis.com
   ```

3. **Create Service Account**
   ```bash
   gcloud iam service-accounts create clarity-docs \
     --display-name="ClarityDocs Service Account"
   
   gcloud projects add-iam-policy-binding your-project-id \
     --member="serviceAccount:clarity-docs@your-project-id.iam.gserviceaccount.com" \
     --role="roles/aiplatform.user"
   
   gcloud projects add-iam-policy-binding your-project-id \
     --member="serviceAccount:clarity-docs@your-project-id.iam.gserviceaccount.com" \
     --role="roles/documentai.apiUser"
   ```

4. **Create Document AI Processor**
   - Go to Google Cloud Console → Document AI
   - Create a new processor (type: "Document OCR")
   - Note the Processor ID and Location

### Setting Up Firebase

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create new project or use existing Google Cloud project
   - Enable Authentication with Email/Password provider

2. **Get Firebase Config**
   - Project Settings → General → Your apps
   - Add web app and copy the config values

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 15 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **AI/ML**: Google Gemini API, Genkit AI orchestration
- **Cloud Services**: 
  - Firebase (Auth, Hosting)
  - Google Cloud Document AI (OCR)
  - Google Translate API
- **State Management**: React Context + Hooks
- **Form Handling**: React Hook Form + Zod validation

### System Architecture

```
┌─────────────┐    ┌──────────────────┐    ┌─────────────────────┐
│ User Browser│───▶│ Next.js Frontend │───▶│ AI & Cloud Services │
└─────────────┘    └──────────────────┘    └─────────────────────┘
                            │                        │
                            ▼                        ▼
                   ┌─────────────────┐    ┌─────────────────────┐
                   │ Firebase Auth   │    │ Genkit AI Flows     │
                   └─────────────────┘    └─────────────────────┘
                                                   │
                                          ┌────────┼────────┐
                                          ▼        ▼        ▼
                                    ┌─────────┐ ┌──────┐ ┌──────────┐
                                    │ Gemini  │ │DocAI │ │Translate │
                                    │   API   │ │ API  │ │   API    │
                                    └─────────┘ └──────┘ └──────────┘
```

### Component Flow

```
DocumentUpload → ClarityPage → SummaryView
     ↓               ↓            ↓
File/Text → Server Actions → AI Flows → Gemini API
     ↓               ↓            ↓
OCR Extract → Process → Results → Interactive UI
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Landing page
│   ├── clarity/           # Main app interface  
│   │   ├── layout.tsx     # Clarity app layout
│   │   └── page.tsx       # Document analysis page
│   ├── sign-in/          # Authentication pages
│   │   └── page.tsx
│   ├── sign-up/
│   │   └── page.tsx
│   ├── layout.tsx        # Root layout
│   ├── globals.css       # Global styles
│   └── favicon.ico
├── components/
│   ├── auth/             # Authentication components
│   │   └── auth-provider.tsx
│   ├── clarity-docs/     # Core app components
│   │   ├── document-upload.tsx
│   │   ├── summary-view.tsx
│   │   ├── interactive-text.tsx
│   │   ├── term-lookup-popover.tsx
│   │   └── summary-skeleton.tsx
│   ├── layout/           # Navigation & layout
│   │   ├── header.tsx
│   │   ├── app-header.tsx
│   │   ├── footer.tsx
│   │   ├── hero-actions.tsx
│   │   └── get-started-button.tsx
│   └── ui/              # shadcn/ui components
├── ai/                   # AI orchestration layer
│   ├── flows/           # Genkit AI flows
│   │   ├── generate-plain-language-summary.ts
│   │   ├── generate-risk-score.ts
│   │   ├── generate-contract-timeline.ts
│   │   ├── answer-what-if-question.ts
│   │   ├── lookup-term-definitions.ts
│   │   ├── generate-examples.ts
│   │   ├── generate-negotiation-suggestions.ts
│   │   └── process-document-flow.ts
│   ├── genkit.ts        # AI configuration
│   └── dev.ts           # Genkit development server
├── context/
│   └── app-state-provider.tsx
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/
│   ├── actions.ts       # Server actions
│   ├── firebase.ts      # Firebase configuration
│   ├── utils.ts         # Utility functions
│   └── env.d.ts         # Environment types
└── images/
    ├── logo.png
    └── cover.png
```

## 🔧 Development

### Available Scripts

```bash
# Development server (port 9002)
npm run dev

# Genkit AI development UI
npm run genkit:dev
npm run genkit:watch

# Production build
npm run build

# Start production server
npm start

# Type checking
npm run typecheck

# Linting
npm run lint
```

### AI Flow Development

ClarityDocs uses **Genkit** for AI orchestration. Each analysis feature corresponds to a flow:

- `generate-plain-language-summary.ts` - Document summarization
- `generate-risk-score.ts` - Risk analysis with scoring
- `generate-contract-timeline.ts` - Date and deadline extraction
- `answer-what-if-question.ts` - Interactive Q&A
- `lookup-term-definitions.ts` - Legal term explanations
- `generate-examples.ts` - Real-world examples
- `generate-negotiation-suggestions.ts` - Negotiation tips
- `process-document-flow.ts` - Document processing pipeline

### Adding New Features

1. **Create AI Flow**: Add new flow in `src/ai/flows/`
2. **Server Action**: Export action in `src/lib/actions.ts`
3. **UI Component**: Add interface in `components/clarity-docs/`
4. **Integration**: Connect in `SummaryView.tsx`

## 🔐 Security Best Practices

### Environment Variables
- ✅ Use `NEXT_PUBLIC_` prefix for client-side variables only
- ✅ Keep server-side API keys in `.env` (never commit)
- ✅ Rotate API keys if exposed in git history
- ✅ Use Firebase Security Rules for data protection

### API Key Management
- **Firebase API Key**: Safe to expose (public by design)
- **Google Cloud API Keys**: Server-side only, restrict by IP/domain
- **Gemini API Key**: Server-side only, monitor usage quotas

### Service Account Security
- Store private keys securely with proper newline escaping
- Use least privilege IAM roles
- Regularly rotate service account keys

## 🚀 Deployment

### Firebase App Hosting (Recommended)

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   firebase login
   ```

2. **Initialize Project**
   ```bash
   firebase init hosting
   ```

3. **Configure Environment**
   - Add production environment variables in Firebase Console
   - Ensure API keys have proper domain restrictions

4. **Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

### Alternative Deployments

- **Vercel**: `vercel --prod`
- **Netlify**: Connect repository for auto-deployment
- **Google Cloud Run**: Containerized deployment

## 📊 Usage Analytics

Track key metrics to improve user experience:

- Document analysis completion rates
- Most used features (Risk Score, Timeline, etc.)
- API response times and error rates
- User retention and engagement patterns

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Make changes**: Follow TypeScript and ESLint conventions
4. **Test thoroughly**: Ensure all AI flows work correctly
5. **Submit PR**: Include description of changes and testing done

### Reporting Issues

- 🐛 **Bug Reports**: Include steps to reproduce, expected vs actual behavior
- 💡 **Feature Requests**: Describe use case and proposed solution
- 📚 **Documentation**: Help improve clarity and completeness

## 🔍 Troubleshooting

### Common Issues

1. **Genkit Server Won't Start**
   ```bash
   # Check if port 4000 is available
   lsof -i :4000
   # Kill process if needed
   kill -9 <PID>
   ```

2. **Document AI Errors**
   - Verify processor ID and location
   - Check service account permissions
   - Ensure Document AI API is enabled

3. **Firebase Auth Issues**
   - Verify API key is correct
   - Check Firebase project configuration
   - Ensure Authentication is enabled

4. **Environment Variable Issues**
   - Check `.env` file exists and has correct format
   - Verify private key newlines are escaped properly
   - Restart development server after changes

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google AI**: Gemini API for powerful language understanding
- **Firebase**: Authentication and hosting infrastructure  
- **shadcn/ui**: Beautiful, accessible component library
- **Genkit**: AI orchestration and development tools
- **Next.js**: Full-stack React framework
- **Tailwind CSS**: Utility-first styling approach

## 🔗 Links

- **Live Demo**: [Coming Soon](#)
- **Documentation**: [Coming Soon](#)
- **Issues**: [GitHub Issues](https://github.com/joe-anidas/ClarityDocs/issues)
- **Discussions**: [GitHub Discussions](https://github.com/joe-anidas/ClarityDocs/discussions)

---

**Made with ❤️ for everyone who's ever been confused by legal jargon**

*Empowering users to understand documents and make informed decisions*