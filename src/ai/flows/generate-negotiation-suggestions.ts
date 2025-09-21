'use server';

/**
 * @fileOverview An AI agent that provides negotiation suggestions for unfavorable clauses in a document.
 *
 * - generateNegotiationSuggestions - A function that creates negotiation suggestions.
 * - GenerateNegotiationSuggestionsInput - The input type for the function.
 * - GenerateNegotiationSuggestionsOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateNegotiationSuggestionsInputSchema = z.object({
  documentText: z
    .string()
    .describe('The text content of the document to be analyzed.'),
});
export type GenerateNegotiationSuggestionsInput = z.infer<
  typeof GenerateNegotiationSuggestionsInputSchema
>;

const SuggestionItemSchema = z.object({
  clause: z.string().describe('The original, unfavorable clause from the document.'),
  suggestion: z.string().describe('A polite, constructive suggestion or question to ask for negotiating this clause.'),
});

const GenerateNegotiationSuggestionsOutputSchema = z.object({
  suggestions: z.array(SuggestionItemSchema).describe('A list of clauses and their corresponding negotiation suggestions.'),
});
export type GenerateNegotiationSuggestionsOutput = z.infer<
  typeof GenerateNegotiationSuggestionsOutputSchema
>;

export async function generateNegotiationSuggestions(
  input: GenerateNegotiationSuggestionsInput
): Promise<GenerateNegotiationSuggestionsOutput> {
  return generateNegotiationSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateNegotiationSuggestionsPrompt',
  input: { schema: GenerateNegotiationSuggestionsInputSchema },
  output: { schema: GenerateNegotiationSuggestionsOutputSchema },
  prompt: `You are an expert negotiation coach. Your task is to analyze the provided document, identify clauses that are unfavorable, one-sided, or risky for the primary user, and provide a polite, constructive suggestion for how to negotiate a better term.

Focus on clauses related to:
- Penalties and fines
- Termination rights (especially if they are one-sided)
- Liability limitations
- Non-compete or exclusivity clauses
- Automatic renewals with short opt-out windows
- Vague or ambiguous responsibilities

For each unfavorable clause you identify, provide the original text and a suggested "talking point" or question. The suggestion should be framed as a reasonable request.

Example Format:
- Clause: "The Service Provider may terminate this agreement for any reason with 30 days' notice."
- Suggestion: "To ensure this partnership is balanced, could we amend this clause to make the termination rights mutual, allowing either party to terminate with 30 days' notice?"

- Clause: "A late payment fee of $100 will be applied for any payment not received by the due date."
- Suggestion: "Would it be possible to add a 5-day grace period before a late fee is assessed? This would be helpful to account for any unexpected bank transfer delays."

Analyze the following document and generate negotiation suggestions:

{{{documentText}}}
  `,
});

const generateNegotiationSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateNegotiationSuggestionsFlow',
    inputSchema: GenerateNegotiationSuggestionsInputSchema,
    outputSchema: GenerateNegotiationSuggestionsOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
