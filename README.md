# ClarityDocs: AI-Powered Document Simplification

This document provides a comprehensive overview of the ClarityDocs application, its architecture, features, and technical implementation.

## 1. Problem Statement

Legal and formal documents—such as rental agreements, employment contracts, and terms of service—are notoriously difficult to understand. They are often filled with dense jargon, complex clauses, and convoluted language that can obscure critical information. This lack of clarity poses a significant risk for individuals and small businesses, who may unknowingly agree to unfavorable terms, miss key deadlines, or expose themselves to hidden liabilities. The effort required to manually decipher these documents is time-consuming and often requires expensive legal expertise, which is inaccessible to many.

## 2. Solution

ClarityDocs is a web application designed to bridge this comprehension gap. By leveraging the power of generative AI, ClarityDocs transforms complex documents into simple, actionable insights. Users can upload a document or paste its text to receive an instant, easy-to-understand breakdown.

The application provides:
-   **Plain-language summaries** of key clauses.
-   A **risk score** to quickly assess how favorable the document is.
-   An interactive **timeline** of important dates and deadlines.
-   A "what-if" **scenario analysis** to explore potential outcomes.
-   **Negotiation suggestions** to help users advocate for better terms.

ClarityDocs empowers users to approach any agreement with confidence and clarity, without needing a law degree.

## 3. Features

-   **Document Upload & Text Extraction:** Securely upload PDF or image files (JPG, PNG, etc.). Text is automatically extracted using Google Cloud's Document AI for accurate OCR.
-   **AI-Powered Summary:** Generates a structured summary with key points, "Do's," and "Don'ts."
-   **Risk Analysis:** Calculates a risk score from 0-100, provides a breakdown of positive and negative factors, and analyzes the tone of key clauses.
-   **Interactive Timeline:** Automatically extracts and visualizes key dates like effective dates, deadlines, and notice periods.
-   **Scenario Analysis ("What-If"):** An interactive chat feature to ask questions about the document (e.g., "What happens if I terminate early?").
-   **"In Simple Terms" Explanations:** Provides real-world examples for confusing legal clauses.
-   **Negotiation Suggestions:** Identifies unfavorable clauses and suggests polite, constructive talking points.
-   **Term Lookup:** Click on highlighted legal terms to get instant, plain-language definitions.
-   **Multi-Language Translation:** The summary can be translated into multiple languages (Hindi, Tamil, Telugu, Malayalam) using the Google Translation API.
-   **Secure User Authentication:** Manages user accounts and sessions with Firebase Authentication.

## 4. Unique Selling Proposition (USP)

ClarityDocs is more than just a summarizer; it is a **comprehensive, interactive analysis partner**. While other tools may offer simple summaries, ClarityDocs provides a multi-faceted suite of interactive tools (Risk Score, Timeline, Scenarios, Negotiation Tips) that empower users not just to **understand** a document, but to **act on it** with confidence. Its intuitive, tab-based interface consolidates these powerful features into a single, easy-to-navigate dashboard, making deep document analysis accessible to everyone.

## 5. Tech Stack & AI Services

-   **Frontend:** Next.js (App Router), React, TypeScript
-   **UI:** Tailwind CSS, ShadCN UI
-   **AI Orchestration:** Genkit
-   **AI & Cloud Services:**
    -   **Google Gemini API:** For all generative AI tasks (summarization, reasoning, analysis, Q&A).
    -   **Google Cloud Document AI:** For high-fidelity Optical Character Recognition (OCR) and text extraction.
    -   **Google Cloud Translation API:** For multilingual summary translation.
-   **Backend & Hosting:**
    -   **Firebase Authentication:** For secure user sign-up and sign-in.
    -   **Firebase App Hosting:** For scalable, managed hosting of the Next.js application.

## 6. Architecture

### High-Level Architecture

The application follows a modern, serverless web architecture that separates the frontend from the backend AI and cloud services.

```
+----------------+      +---------------------+      +------------------------+
|   User's       |      |   Next.js Frontend  |      |   AI & Cloud Services  |
|   Browser      | ---> | (Firebase Hosting)  | ---> |   (Google Cloud)       |
+----------------+      +----------+----------+      +------------+-----------+
                                   |                       |
                                   |   +-------------------+
                                   |   |
      +----------------------------+   |
      |          Firebase Auth         |
      +--------------------------------+
```

1.  **Client-Side (User's Browser):** The user interacts with the React-based UI.
2.  **Frontend Server (Next.js on App Hosting):** Serves the application, handles routing, and executes server-side logic via Next.js Server Actions.
3.  **AI & Cloud Services (Google Cloud):** Server Actions securely call Genkit flows, which in turn orchestrate calls to Document AI, Gemini, and the Translation API.
4.  **Authentication (Firebase):** Firebase Authentication manages user identity and secures access to the application.

### Low-Level Component Interaction

```
[DocumentUpload.tsx] --(file/text)--> [clarity/page.tsx] --(summarize)--> [actions.ts]
      |                                                                       |
      |                                                             [generate-summary-flow.ts]
      |                                                                       |
      V                                                                   (Gemini API)
[SummaryView.tsx] <--(summaryData)-- [clarity/page.tsx] <----------------------
      |
      +-- [Risk Score Tab] --(analyze)--> [actions.ts] -> [risk-score-flow.ts] -> (Gemini)
      |
      +-- [Timeline Tab] --(extract)--> [actions.ts] -> [timeline-flow.ts] -> (Gemini)
      |
      +-- [Scenarios Tab] --(ask)--> [actions.ts] -> [what-if-flow.ts] -> (Gemini)
      |
      +-- [Term Lookup] --(define)--> [actions.ts] -> [lookup-term-flow.ts] -> (Gemini)
```

-   The UI is divided into two main views: `DocumentUpload` and `SummaryView`.
-   User input (text paste or file upload) triggers a server action (`summarizeDocumentAction`).
-   This action invokes a Genkit flow that calls the Gemini API to generate the initial summary.
-   The `SummaryView` displays this data in a tabbed interface. Interacting with each tab lazily triggers additional server actions to fetch more specific analysis (e.g., risk score, timeline), ensuring a fast initial load time.

## 7. User Flows

1.  **New User Registration & First Analysis:**
    -   User lands on the landing page.
    -   Clicks "Get Started Free" -> Navigates to `/sign-up`.
    -   Creates an account and is automatically logged in.
    -   Redirected to the `/clarity` page.
    -   Pastes document text or uploads a file.
    -   Receives the interactive summary and begins exploring the different analysis tabs.

2.  **Existing User Sign-In:**
    -   User lands on the landing page.
    -   Clicks "Sign In" -> Navigates to `/sign-in`.
    -   Enters credentials and is logged in.
    -   Redirected to the `/clarity` page to start a new analysis.

3.  **Document Analysis & Interaction:**
    -   On the `/clarity` page, the user uploads a document.
    -   The `SummaryView` appears with the main summary.
    -   User clicks the "Risk Score" tab. A request is sent to generate and display the risk analysis.
    -   User clicks a highlighted term in the summary text. A popover appears with an AI-generated definition.
    -   User goes to the "Scenarios" tab and asks a "what-if" question, receiving an answer based on the document's content.

## 8. Local Development Setup

Follow these steps to set up and run the project on your local machine.

### Prerequisites

-   **Node.js** (v20 or later)
-   **npm** (or a compatible package manager)
-   A **Firebase Project** with Authentication enabled.
-   A **Google Cloud Project** with the following APIs enabled:
    -   AI Platform API (for Genkit/Gemini)
    -   Document AI API
    -   Cloud Translation API

### 1. Clone the Repository

Clone the project to your local machine:

```bash
git clone <repository-url>
cd clarity-docs
```

### 2. Install Dependencies

Install the required npm packages:

```bash
npm install
```

### 3. Configure Environment Variables

Create a new file named `.env` in the root of the project by copying the example:

```bash
cp .env.example .env
```

Now, open the `.env` file and fill in the values with your specific Firebase and Google Cloud project details.

-   **Firebase Config:** You can find these values in your Firebase project settings under "Your apps" -> "Web app".
-   **Google Cloud Config:**
    -   `GCLOUD_PROJECT`: Your Google Cloud Project ID.
    -   `GEMINI_API_KEY`: Your API key for the Gemini API.
    -   `DOCAI_PROCESSOR_ID`: The ID of your Document AI processor.
    -   `DOCAI_LOCATION`: The location of your Document AI processor (e.g., `us`).

### 4. Authenticate with Google Cloud

To run the Genkit flows locally, you need to authenticate your local environment with Google Cloud. Run the following command and follow the prompts in your browser:

```bash
gcloud auth application-default login
```

### 5. Run the Development Servers

The application requires two separate development servers to be running simultaneously.

-   **Terminal 1: Start the Next.js Frontend**
    This server handles the web interface.

    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:9002`.

-   **Terminal 2: Start the Genkit AI Server**
    This server runs the Genkit flows that connect to the AI models.

    ```bash
    npm run genkit:dev
    ```

You should now have the full application running locally.
