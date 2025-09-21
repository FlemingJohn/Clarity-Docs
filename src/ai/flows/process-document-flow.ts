'use server';
/**
 * @fileOverview An AI agent that processes documents using Google Cloud Document AI.
 *
 * - processDocument - A function that handles document processing.
 * - ProcessDocumentInput - The input type for the processDocument function.
 * - ProcessDocumentOutput - The return type for the processDocument function.
 */

import { DocumentProcessorServiceClient } from '@google-cloud/documentai';
import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ProcessDocumentInputSchema = z.object({
  fileDataUri: z
    .string()
    .describe(
      "The document file as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ProcessDocumentInput = z.infer<typeof ProcessDocumentInputSchema>;

const ProcessDocumentOutputSchema = z.object({
  text: z.string().describe('The extracted text from the document.'),
});
export type ProcessDocumentOutput = z.infer<typeof ProcessDocumentOutputSchema>;

export async function processDocument(
  input: ProcessDocumentInput
): Promise<ProcessDocumentOutput> {
  return processDocumentFlow(input);
}

const processDocumentFlow = ai.defineFlow(
  {
    name: 'processDocumentFlow',
    inputSchema: ProcessDocumentInputSchema,
    outputSchema: ProcessDocumentOutputSchema,
  },
  async (input) => {
    const { 
      GCLOUD_PROJECT, 
      DOCAI_PROCESSOR_ID, 
      DOCAI_LOCATION,
      GOOGLE_CLOUD_CLIENT_EMAIL,
      GOOGLE_CLOUD_PRIVATE_KEY
    } = process.env;

    if (!GCLOUD_PROJECT || !DOCAI_PROCESSOR_ID || !DOCAI_LOCATION) {
      throw new Error('Missing GCLOUD_PROJECT, DOCAI_PROCESSOR_ID, or DOCAI_LOCATION from .env');
    }

    if (!GOOGLE_CLOUD_CLIENT_EMAIL || !GOOGLE_CLOUD_PRIVATE_KEY) {
      throw new Error('Missing GOOGLE_CLOUD_CLIENT_EMAIL or GOOGLE_CLOUD_PRIVATE_KEY from .env');
    }

    // Configure the client with service account credentials
    const client = new DocumentProcessorServiceClient({
      credentials: {
        client_email: GOOGLE_CLOUD_CLIENT_EMAIL,
        private_key: GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, '\n'), // Handle escaped newlines
      },
      projectId: GCLOUD_PROJECT,
    });

    const name = `projects/${GCLOUD_PROJECT}/locations/${DOCAI_LOCATION}/processors/${DOCAI_PROCESSOR_ID}`;

    const b64part = input.fileDataUri.substring(input.fileDataUri.indexOf(',') + 1);
    const mimePart = input.fileDataUri.substring(5, input.fileDataUri.indexOf(';'));

    if (!mimePart || !b64part) {
        throw new Error('Could not extract mime type or content from data URI.');
    }


    const request = {
      name,
      rawDocument: {
        content: b64part,
        mimeType: mimePart,
      },
    };

    const [result] = await client.processDocument(request);
    const { document } = result;

    if (!document || !document.text) {
        throw new Error('Document AI did not return any text.');
    }

    return { text: document.text };
  }
);
