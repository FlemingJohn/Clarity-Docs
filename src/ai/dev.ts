import { config } from 'dotenv';
config();

import '@/ai/flows/generate-plain-language-summary.ts';
import '@/ai/flows/lookup-term-definitions.ts';
import '@/ai/flows/process-document-flow.ts';
import '@/ai/flows/answer-what-if-question.ts';
import '@/ai/flows/generate-examples.ts';
import '@/ai/flows/generate-risk-score.ts';
import '@/ai/flows/generate-contract-timeline.ts';
import '@/ai/flows/generate-negotiation-suggestions.ts';
