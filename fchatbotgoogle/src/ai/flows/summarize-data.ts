// src/ai/flows/summarize-data.ts
'use server';
/**
 * @fileOverview Summarizes data from an Excel file.
 *
 * - summarizeData - A function that handles the data summarization process.
 * - SummarizeDataInput - The input type for the summarizeData function.
 * - SummarizeDataOutput - The return type for the summarizeData function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SummarizeDataInputSchema = z.object({
  excelData: z.string().describe('The data from the Excel file as a string.'),
});
export type SummarizeDataInput = z.infer<typeof SummarizeDataInputSchema>;

const SummarizeDataOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the financial data.'),
});
export type SummarizeDataOutput = z.infer<typeof SummarizeDataOutputSchema>;

export async function summarizeData(input: SummarizeDataInput): Promise<SummarizeDataOutput> {
  return summarizeDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeDataPrompt',
  input: {
    schema: z.object({
      excelData: z.string().describe('The data from the Excel file.'),
    }),
  },
  output: {
    schema: z.object({
      summary: z.string().describe('A concise summary of the financial data.'),
    }),
  },
  prompt: `You are a financial analyst. Please provide a concise summary of the following financial data:

{{{excelData}}}

Summary:`,
});

const summarizeDataFlow = ai.defineFlow<
  typeof SummarizeDataInputSchema,
  typeof SummarizeDataOutputSchema
>({
  name: 'summarizeDataFlow',
  inputSchema: SummarizeDataInputSchema,
  outputSchema: SummarizeDataOutputSchema,
},
async input => {
  const {output} = await prompt(input);
  return output!;
});
