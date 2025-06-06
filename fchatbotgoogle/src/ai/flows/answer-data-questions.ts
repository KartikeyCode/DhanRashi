// This is an autogenerated file from Firebase Studio.
'use server';
/**
 * @fileOverview An AI agent that answers questions about financial data from an uploaded Excel file.
 *
 * - answerDataQuestions - A function that handles the question answering process.
 * - AnswerDataQuestionsInput - The input type for the answerDataQuestions function.
 * - AnswerDataQuestionsOutput - The return type for the answerDataQuestions function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AnswerDataQuestionsInputSchema = z.object({
  excelData: z.string().describe('The data from the uploaded Excel file as a string.'),
  question: z.string().describe('The question to ask about the data.'),
});
export type AnswerDataQuestionsInput = z.infer<typeof AnswerDataQuestionsInputSchema>;

const AnswerDataQuestionsOutputSchema = z.object({
  answer: z.string().describe('The answer to the question about the data.'),
});
export type AnswerDataQuestionsOutput = z.infer<typeof AnswerDataQuestionsOutputSchema>;

export async function answerDataQuestions(input: AnswerDataQuestionsInput): Promise<AnswerDataQuestionsOutput> {
  return answerDataQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerDataQuestionsPrompt',
  input: {
    schema: z.object({
      excelData: z.string().describe('The data from the uploaded Excel file.'),
      question: z.string().describe('The question to ask about the data.'),
    }),
  },
  output: {
    schema: z.object({
      answer: z.string().describe('The answer to the question about the data.'),
    }),
  },
  prompt: `You are a financial data analyst. Answer questions according to the data provided.

Data: {{{excelData}}}

Question: {{{question}}}`,
});

const answerDataQuestionsFlow = ai.defineFlow<
  typeof AnswerDataQuestionsInputSchema,
  typeof AnswerDataQuestionsOutputSchema
>({
  name: 'answerDataQuestionsFlow',
  inputSchema: AnswerDataQuestionsInputSchema,
  outputSchema: AnswerDataQuestionsOutputSchema,
},
async input => {
  const {output} = await prompt(input);
  return output!;
});
