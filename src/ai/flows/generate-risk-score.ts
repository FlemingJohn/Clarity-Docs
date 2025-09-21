'use server';

/**
 * @fileOverview An AI agent that analyzes a document for potential risks and generates a score.
 *
 * - generateRiskScore - A function that creates a risk report.
 * - GenerateRiskScoreInput - The input type for the function.
 * - GenerateRiskScoreOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateRiskScoreInputSchema = z.object({
  documentText: z
    .string()
    .describe('The text content of the document to be analyzed.'),
  agreementType: z.string().describe('The type of agreement.').optional(),
});
export type GenerateRiskScoreInput = z.infer<
  typeof GenerateRiskScoreInputSchema
>;

const ScoreBreakdownSchema = z.object({
    positive: z.array(z.string()).describe('List of positive or fair clauses that protect the user.'),
    negative: z.array(z.string()).describe('List of negative or risky clauses that could be problematic for the user.'),
});

const ToneAnalysisItemSchema = z.object({
    clause: z.string().describe('The original clause from the document.'),
    tone: z.enum(['Friendly', 'Neutral', 'Strict']).describe('The detected tone of the clause (Friendly, Neutral, or Strict).'),
    explanation: z.string().describe('A brief explanation for the detected tone and its implication.'),
});

const GenerateRiskScoreOutputSchema = z.object({
  riskScore: z.number().min(0).max(100).describe('A score from 0 (very high risk) to 100 (very low risk) representing the overall safety of the document for the user.'),
  riskSummary: z.string().describe('A concise, one or two-sentence summary explaining the main reasons for the score.'),
  scoreBreakdown: ScoreBreakdownSchema.describe('A breakdown of the specific factors that influenced the score.'),
  toneAnalysis: z.array(ToneAnalysisItemSchema).describe('An analysis of the tone of individual clauses.'),
});
export type GenerateRiskScoreOutput = z.infer<
  typeof GenerateRiskScoreOutputSchema
>;

export async function generateRiskScore(
  input: GenerateRiskScoreInput
): Promise<GenerateRiskScoreOutput> {
  return generateRiskScoreFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRiskScorePrompt',
  // The input schema is modified inside the flow, so we don't declare it here.
  output: { schema: GenerateRiskScoreOutputSchema },
  prompt: `You are an expert legal analyst. Your task is to analyze the provided document and perform two main actions:

1.  **Calculate a "Risk Score"** for the primary user, from 0 (extremely risky) to 100 (very safe). The score should reflect how fair and safe the document is. A typical, standard agreement might score between 60 and 80.
2.  **Perform a "Tone Analysis"** on key clauses. For each key clause, identify whether its tone is Friendly, Neutral, or Strict, and provide a brief explanation.

After determining the score, you must provide:
- **A concise summary** explaining the main reasons for your score.
- **A breakdown of the score**, listing specific positive (fair/protective) and negative (risky/unfavorable) clauses.
- **The Tone Analysis results**, including the original clause, its detected tone, and an explanation.

{{#if agreementType}}
This is a "{{agreementType}}", so evaluate the risks and fairness based on standards for this type of document.

{{#if isRentalAgreement}}
**For this Rental Agreement, focus on:**
- Security Deposit, Rent Escalation, Maintenance, Use Restrictions, Penalties.
{{/if}}

{{#if isLoanAgreement}}
**For this Loan Agreement, focus on:**
- Interest Rate, Prepayment Rules, Collateral, Default Terms, Penalty Charges.
{{/if}}

{{#if isTermsOfService}}
**For this Terms of Service, focus on:**
- Data Usage, Termination Rights, Limitation of Liability, Dispute Resolution.
{{/if}}

{{#if isEmploymentContract}}
**For this Employment Contract, focus on:**
- Notice Period, Termination Conditions, Non-Compete Clauses, Intellectual Property.
{{/if}}

{{/if}}

Analyze the following document and generate the risk score, breakdown, and tone analysis:

{{{documentText}}}
  `,
});

const generateRiskScoreFlow = ai.defineFlow(
  {
    name: 'generateRiskScoreFlow',
    inputSchema: GenerateRiskScoreInputSchema,
    outputSchema: GenerateRiskScoreOutputSchema,
  },
  async input => {
    // Transform the input to be compatible with the simple Handlebars templating.
    const promptInput: Record<string, any> = {
      documentText: input.documentText,
      agreementType: input.agreementType,
    };
    if (input.agreementType) {
        if (input.agreementType === 'Rental Agreement') promptInput['isRentalAgreement'] = true;
        if (input.agreementType === 'Loan Agreement') promptInput['isLoanAgreement'] = true;
        if (input.agreementType === 'Terms of Service') promptInput['isTermsOfService'] = true;
        if (input.agreementType === 'Employment Contract') promptInput['isEmploymentContract'] = true;
    }

    const { output } = await prompt(promptInput);
    return output!;
  }
);
