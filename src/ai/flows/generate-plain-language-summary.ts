'use server';

/**
 * @fileOverview A document simplification AI agent that generates summaries in plain language.
 *
 * - generatePlainLanguageSummary - A function that handles the document simplification process.
 * - GeneratePlainLanguageSummaryInput - The input type for the generatePlainLanguageSummary function.
 * - GeneratePlainLanguageSummaryOutput - The return type for the generatePlainLanguageSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePlainLanguageSummaryInputSchema = z.object({
  documentText: z
    .string()
    .describe('The text content of the document to be summarized.'),
  agreementType: z.string().describe('The type of agreement being summarized.').optional(),
});
export type GeneratePlainLanguageSummaryInput = z.infer<
  typeof GeneratePlainLanguageSummaryInputSchema
>;

const SummaryPointSchema = z.object({
  keyPoint: z.string().describe('A short, clear heading for a key clause or topic.'),
  description: z.string().describe('A plain-language explanation of the key point.'),
});

const GeneratePlainLanguageSummaryOutputSchema = z.object({
  summary: z.array(SummaryPointSchema).describe('A list of simplified key points from the document.'),
  dos: z.array(z.string()).describe("A list of things the user is permitted to do based on the document. Frame as 'You can...'"),
  donts: z.array(z.string()).describe("A list of things the user is prohibited from doing based on the document. Frame as 'You cannot...'"),
  lockInPeriod: z.string().optional().describe('The minimum stay required, if mentioned (e.g., "11 months").'),
  noticePeriod: z.string().optional().describe('The advance time required for termination, if mentioned (e.g., "3 months").'),
  effectiveDate: z.string().optional().describe('The start or effective date of the agreement, if mentioned (e.g., "2024-07-15").'),
});
export type GeneratePlainLanguageSummaryOutput = z.infer<
  typeof GeneratePlainLanguageSummaryOutputSchema
>;

export async function generatePlainLanguageSummary(
  input: GeneratePlainLanguageSummaryInput
): Promise<GeneratePlainLanguageSummaryOutput> {
  return generatePlainLanguageSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePlainLanguageSummaryPrompt',
  // The input schema is modified inside the flow, so we don't declare it here.
  output: {schema: GeneratePlainLanguageSummaryOutputSchema},
  prompt: `You are an expert legal professional skilled at simplifying complex documents. Your task is to do two things:
1. Create a structured list of plain language key points. For each key point, provide a short, clear heading (as keyPoint) and a simple explanation (as description). Do not use markdown.
2. Generate a list of "Do's" and "Don'ts" from the document. These should be short, direct statements about what the user can and cannot do.
3. Extract the lock-in period, termination notice period, and the agreement's effective/start date as separate fields. For dates, return them in YYYY-MM-DD format.

  {{#if agreementType}}
  The user has specified that this is a "{{agreementType}}" document. Focus your summary on the most critical clauses for this type of agreement.
  {{/if}}

  {{#if isRentalAgreement}}
  **For this Rental Agreement, pay close attention to and summarize the following:**
  - **Effective Date:** When does the agreement start? Extract this to the effectiveDate field in YYYY-MM-DD format.
  - **Notice Period:** How much advance time is needed to terminate the agreement? Extract this to the noticePeriod field.
  - **Lock-in Period:** Is there a minimum stay required? Extract this to the lockInPeriod field.
  - **Security Deposit:** What is the amount and what are the conditions for its full refund?
  - **Rent Escalation:** Is there a yearly percentage increase in rent mentioned?
  - **Maintenance Charges:** Who is responsible for what (tenant vs. landlord)?
  - **Use Restrictions:** Are there rules about subletting, pets, or commercial use?
  - **Penalty Clauses:** What are the fees for late rent or early termination?
  {{/if}}

  {{#if isLoanAgreement}}
  **For this Loan Agreement, pay close attention to and summarize the following:**
   - **Effective Date:** When does the loan agreement start? Extract this to the effectiveDate field in YYYY-MM-DD format.
  - **Interest Rate:** Is it fixed or floating? How is it compounded?
  - **Repayment Schedule:** What is the monthly payment (EMI) and the total tenure?
  - **Prepayment Rules:** Can the loan be paid off early? Is there a penalty for doing so?
  - **Collateral/Security:** What assets, if any, are pledged?
  - **Default Terms:** What actions constitute a default, and what is the grace period?
  - **Penalty Charges:** What are the fees for late payments, bounced checks, or foreclosure?
  - **Lender's Rights:** Under what conditions can the lender repossess assets or take legal action?
  {{/if}}

  {{#if isTermsOfService}}
  **For this Terms of Service, pay close attention to and summarize the following:**
  - **Effective Date:** When do these terms take effect? Extract this to the effectiveDate field in YYYY-MM-DD format.
  - **User Obligations:** What are you forbidden from doing (e.g., spam, illegal use)?
  - **Data Usage & Privacy:** How is your personal data collected, stored, and shared?
  - **Termination Rights:** Under what conditions can the service provider suspend or ban your account?
  - **Dispute Resolution:** Where will legal disputes be handled (jurisdiction)? Is arbitration required?
  - **Limitation of Liability:** How does the provider limit their responsibility if things go wrong?
  - **Automatic Renewals/Subscriptions:** Are there auto-renewing charges? How can you cancel?
  - **Intellectual Property:** Who owns the content you upload?
  {{/if}}

  {{#if isEmploymentContract}}
  **For this Employment Contract, pay close attention to and summarize the following:**
  - **Effective Date:** What is the start date of employment? Extract this to the effectiveDate field in YYYY-MM-DD format.
  - **Job Role & Responsibilities:** What is your official title and what are your key duties?
  - **Compensation:** What is the base salary, and are there allowances or bonuses?
  - **Probation Period:** How long is it and what are the terms for confirmation?
  - **Notice Period:** How much notice is required for resignation or termination? Extract this to the noticePeriod field.
  - **Working Hours & Leave Policy:** What are the standard hours and leave entitlements?
  - **Benefits:** Are health insurance, retirement plans, or other perks included?
  - **Termination Conditions:** What are the reasons for termination with and without cause?
  - **Non-Compete / Moonlighting Clauses:** Are there restrictions on working for other companies during or after employment?
  {{/if}}

  Analyze the following document and provide the simplified summary and the lists of Do's and Don'ts.

  {{{documentText}}}
  `,
});


const generatePlainLanguageSummaryFlow = ai.defineFlow(
  {
    name: 'generatePlainLanguageSummaryFlow',
    inputSchema: GeneratePlainLanguageSummaryInputSchema,
    outputSchema: GeneratePlainLanguageSummaryOutputSchema,
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
    
    const {output} = await prompt(promptInput);
    return output!;
  }
);
