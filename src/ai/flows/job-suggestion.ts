// src/ai/flows/job-suggestion.ts
'use server';
/**
 * @fileOverview Job role suggestion flow using AI.
 *
 * This file defines a Genkit flow that suggests job roles based on a user's profile and application history.
 *
 * @remarks
 *  - `suggestJobRoles` -  The exported function that initiates the job role suggestion flow.
 *  - `JobSuggestionInput` - The input type for the `suggestJobRoles` function, including user profile and application history.
 *  - `JobSuggestionOutput` - The output type for the `suggestJobRoles` function, providing a list of suggested job roles.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

// Define the input schema for the job suggestion flow.
const JobSuggestionInputSchema = z.object({
  userProfile: z
    .string()
    .describe('Description of the user profile, skills, and experience.'),
  applicationHistory: z
    .string()
    .describe('Summary of the user job application history.'),
});

export type JobSuggestionInput = z.infer<typeof JobSuggestionInputSchema>;

// Define the output schema for the job suggestion flow.
const JobSuggestionOutputSchema = z.object({
  suggestedRoles: z
    .array(z.string())
    .describe('List of suggested job roles based on the user profile and application history.'),
});

export type JobSuggestionOutput = z.infer<typeof JobSuggestionOutputSchema>;

// Exported function to suggest job roles based on user profile and application history.
export async function suggestJobRoles(input: JobSuggestionInput): Promise<JobSuggestionOutput> {
  return suggestJobRolesFlow(input);
}

// Define the prompt for the job suggestion flow.
const suggestJobRolesPrompt = ai.definePrompt({
  name: 'suggestJobRolesPrompt',
  input: {
    schema: z.object({
      userProfile: z
        .string()
        .describe('Description of the user profile, skills, and experience.'),
      applicationHistory: z
        .string()
        .describe('Summary of the user job application history.'),
    }),
  },
  output: {
    schema: z.object({
      suggestedRoles: z
        .array(z.string())
        .describe('List of suggested job roles based on the user profile and application history.'),
    }),
  },
  prompt: `Based on the user profile: {{{userProfile}}} and application history: {{{applicationHistory}}}, suggest a list of relevant job roles the user might be interested in.

  Please provide a list of job roles that the user might not have considered but are relevant to their background.
  The list should be comma separated.
  `,
});

// Define the Genkit flow for suggesting job roles.
const suggestJobRolesFlow = ai.defineFlow<
  typeof JobSuggestionInputSchema,
  typeof JobSuggestionOutputSchema
>(
  {
    name: 'suggestJobRolesFlow',
    inputSchema: JobSuggestionInputSchema,
    outputSchema: JobSuggestionOutputSchema,
  },
  async input => {
    const {output} = await suggestJobRolesPrompt(input);
    return output!;
  }
);
