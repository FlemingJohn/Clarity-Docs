'use server';

/**
 * @fileOverview An AI agent that answers "what-if" questions based on a document.
 *
 * - answerWhatIfQuestion - A function that handles the question answering process.
 * - AnswerWhatIfQuestionInput - The input type for the function.
 * - AnswerWhatIfQuestionOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerWhatIfQuestionInputSchema = z.object({
  documentText: z
    .string()
    .describe('The text content of the document to be analyzed.'),
  question: z.string().describe('The user\'s "what-if" question.'),
});
export type AnswerWhatIfQuestionInput = z.infer<
  typeof AnswerWhatIfQuestionInputSchema
>;

const AnswerWhatIfQuestionOutputSchema = z.object({
  answer: z.string().describe('The answer to the user\'s question, based on the document.'),
});
export type AnswerWhatIfQuestionOutput = z.infer<
  typeof AnswerWhatIfQuestionOutputSchema
>;

export async function answerWhatIfQuestion(
  input: AnswerWhatIfQuestionInput
): Promise<AnswerWhatIfQuestionOutput> {
  return answerWhatIfQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerWhatIfQuestionPrompt',
  input: {schema: AnswerWhatIfQuestionInputSchema},
  output: {schema: AnswerWhatIfQuestionOutputSchema},
  prompt: `You are a helpful assistant who answers user questions based *only* on the provided document text. Your task is to analyze the user's "what-if" question and find the relevant information within the document to construct a clear and concise answer.

If the document does not contain information to answer the question, state that clearly. Do not make up information or use external knowledge.

User's Question:
"{{{question}}}"

Document Text:
---
{{{documentText}}}
---

Based on the document text, what is the answer to the user's question?`,
});

const answerWhatIfQuestionFlow = ai.defineFlow(
  {
    name: 'answerWhatIfQuestionFlow',
    inputSchema: AnswerWhatIfQuestionInputSchema,
    outputSchema: AnswerWhatIfQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
