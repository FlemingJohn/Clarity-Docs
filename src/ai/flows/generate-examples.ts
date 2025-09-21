'use server';

/**
 * @fileOverview An AI agent that generates real-world examples for legal clauses.
 *
 * - generateExamples - A function that creates real-world examples for clauses.
 * - GenerateExamplesInput - The input type for the function.
 * - GenerateExamplesOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateExamplesInputSchema = z.object({
  documentText: z
    .string()
    .describe('The text content of the document to be analyzed.'),
});
export type GenerateExamplesInput = z.infer<
  typeof GenerateExamplesInputSchema
>;

const ExampleItemSchema = z.object({
  clause: z.string().describe('The original, potentially confusing clause from the document.'),
  example: z.string().describe('A simple, real-world example explaining the clause.'),
});

const GenerateExamplesOutputSchema = z.object({
  examples: z.array(ExampleItemSchema).describe('A list of clauses and their real-world examples.'),
});
export type GenerateExamplesOutput = z.infer<
  typeof GenerateExamplesOutputSchema
>;

export async function generateExamples(
  input: GenerateExamplesInput
): Promise<GenerateExamplesOutput> {
  return generateExamplesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateExamplesPrompt',
  input: { schema: GenerateExamplesInputSchema },
  output: { schema: GenerateExamplesOutputSchema },
  prompt: `You are an expert at making complex legal text easy to understand. Your task is to analyze the provided document, identify key clauses that have real-world consequences for the user, and explain them with a simple, concrete example.

For each key clause you identify, provide the original clause text and a practical "real-life" scenario.

Example Format:
- Clause: "The Lessee shall be liable to pay a penalty amounting to two (2) times the monthly rent for every month of unauthorized occupation of the Demised Premises."
- Example: "If you stay in the apartment after your lease ends without permission, you will have to pay double the rent for each month you're there."

- Clause: "The Lessee shall not be entitled to make any structural additions or alterations to the Demised Premises without the prior written consent of the Owner."
- Example: "You cannot knock down a wall or build a new one without getting written permission from the landlord first."

Analyze the following document and generate these clause-to-example mappings:

{{{documentText}}}
  `,
});

const generateExamplesFlow = ai.defineFlow(
  {
    name: 'generateExamplesFlow',
    inputSchema: GenerateExamplesInputSchema,
    outputSchema: GenerateExamplesOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
