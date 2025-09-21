'use server';

/**
 * @fileOverview An AI agent that looks up definitions of specific terms.
 *
 * - lookupTermDefinition - A function that handles the term definition lookup process.
 * - LookupTermDefinitionInput - The input type for the lookupTermDefinition function.
 * - LookupTermDefinitionOutput - The return type for the lookupTermDefinition function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LookupTermDefinitionInputSchema = z.object({
  term: z.string().describe('The term to look up.'),
  context: z.string().describe('The context in which the term is used.'),
});
export type LookupTermDefinitionInput = z.infer<typeof LookupTermDefinitionInputSchema>;

const LookupTermDefinitionOutputSchema = z.object({
  definition: z.string().describe('The plain-language definition of the term.'),
});
export type LookupTermDefinitionOutput = z.infer<typeof LookupTermDefinitionOutputSchema>;

export async function lookupTermDefinition(input: LookupTermDefinitionInput): Promise<LookupTermDefinitionOutput> {
  return lookupTermDefinitionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'lookupTermDefinitionPrompt',
  input: {schema: LookupTermDefinitionInputSchema},
  output: {schema: LookupTermDefinitionOutputSchema},
  prompt: `You are an expert in providing plain-language definitions for technical terms. Given the term and its context, provide a clear and concise definition that is easy to understand.

Term: {{{term}}}
Context: {{{context}}}

Definition:`,
});

const lookupTermDefinitionFlow = ai.defineFlow(
  {
    name: 'lookupTermDefinitionFlow',
    inputSchema: LookupTermDefinitionInputSchema,
    outputSchema: LookupTermDefinitionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
