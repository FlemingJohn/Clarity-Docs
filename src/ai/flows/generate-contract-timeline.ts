'use server';

/**
 * @fileOverview An AI agent that extracts key dates from a document and creates a timeline.
 *
 * - generateContractTimeline - A function that creates a timeline of contract events.
 * - GenerateContractTimelineInput - The input type for the function.
 * - GenerateContractTimelineOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateContractTimelineInputSchema = z.object({
  documentText: z
    .string()
    .describe('The text content of the document to be analyzed.'),
  agreementType: z.string().describe('The type of agreement.').optional(),
});
export type GenerateContractTimelineInput = z.infer<
  typeof GenerateContractTimelineInputSchema
>;

const TimelineEventSchema = z.object({
  date: z.string().describe('The date of the event in YYYY-MM-DD format.'),
  event: z.string().describe('A brief, clear description of the event (e.g., "Payment Due", "Contract Renewal Deadline").'),
});

const GenerateContractTimelineOutputSchema = z.object({
  timeline: z.array(TimelineEventSchema).describe('A list of key events and their dates, sorted chronologically.'),
});
export type GenerateContractTimelineOutput = z.infer<
  typeof GenerateContractTimelineOutputSchema
>;

export async function generateContractTimeline(
  input: GenerateContractTimelineInput
): Promise<GenerateContractTimelineOutput> {
  return generateContractTimelineFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateContractTimelinePrompt',
  // The input schema is modified inside the flow, so we don't declare it here.
  output: { schema: GenerateContractTimelineOutputSchema },
  prompt: `You are an expert legal assistant specializing in contract management. Your task is to meticulously analyze the provided document and extract all key dates, deadlines, and recurring events to create a comprehensive, chronological timeline.

Identify dates related to the following categories:

**Financial Dates:**
- Payment Due Dates (e.g., monthly rent, loan installments)
- End of Grace Periods for late payments
- Dates for scheduled price increases or interest rate changes

**Deadlines & Key Periods:**
- Notice periods for termination or other actions (calculate the last possible date to give notice if possible)
- Cancellation windows (start and end dates)
- Deadlines for deliverables or specific performance milestones
- Review periods (e.g., performance reviews)

**Contract Lifecycle Dates:**
- Effective or Start Dates
- Expiration or Termination Dates
- Automatic Renewal Dates
- Deadlines to opt-out of an auto-renewal
- Probation Period End Dates

{{#if agreementType}}
This is a "{{agreementType}}", so pay special attention to dates commonly found in this type of document.
{{/if}}

For each event you identify, provide the specific date in YYYY-MM-DD format and a concise description of the event.

Return all identified events as a single list, sorted chronologically with the earliest date first.

Analyze the following document and generate the timeline:

{{{documentText}}}
  `,
});

const generateContractTimelineFlow = ai.defineFlow(
  {
    name: 'generateContractTimelineFlow',
    inputSchema: GenerateContractTimelineInputSchema,
    outputSchema: GenerateContractTimelineOutputSchema,
  },
  async input => {
    // Transform the input to be compatible with the simple Handlebars templating.
    const promptInput: Record<string, any> = {
      documentText: input.documentText,
      agreementType: input.agreementType,
    };

    const { output } = await prompt(promptInput);
    
    // Sort the timeline by date just in case the model didn't
    if (output?.timeline) {
        output.timeline.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
    
    return output!;
  }
);
