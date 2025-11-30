
'use server';
/**
 * @fileOverview An AI flow for handling global search queries.
 *
 * - search - A function that performs a search using an AI model.
 * - SearchInput - The input type for the search function.
 * - SearchOutput - The return type for the search function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { navItems } from '@/lib/heat-treatment-data';
import type { NavItem } from '@/lib/heat-treatment-data';
import * as LucideIcons from 'lucide-react';

// Define the schema for the search results
const SearchResultSchema = z.object({
  type: z.enum(['page', 'answer']).describe('The type of search result.'),
  title: z.string().describe('The title of the search result.'),
  content: z.string().describe('A brief description or answer.'),
  icon: z.string().describe('The name of a lucide-react icon.'),
  href: z.string().optional().describe('The URL link for the result, if applicable.'),
});

// Define the input and output schemas for the flow
const SearchInputSchema = z.object({
  query: z.string(),
});
export type SearchInput = z.infer<typeof SearchInputSchema>;

const SearchOutputSchema = z.object({
  results: z.array(SearchResultSchema),
});
export type SearchOutput = z.infer<typeof SearchOutputSchema>;

// Define a tool to search navigation items
const searchNavItems = ai.defineTool(
    {
      name: 'searchNavItems',
      description: 'Search for relevant pages within the application based on a query.',
      inputSchema: z.object({
        query: z.string(),
      }),
      outputSchema: z.array(z.object({
        label: z.string(),
        href: z.string(),
        icon: z.string(),
      })),
    },
    async (input) => {
        const query = input.query.toLowerCase();
        return navItems.filter(item => 
            !item.hidden &&
            (item.label.toLowerCase().includes(query))
        ).map(item => ({
            label: item.label,
            href: item.href,
            icon: (item.icon as any).displayName || 'File',
        }));
    }
);


// Define the main search flow
const searchFlow = ai.defineFlow(
  {
    name: 'searchFlow',
    inputSchema: SearchInputSchema,
    outputSchema: SearchOutputSchema,
  },
  async (input) => {
    const llmResponse = await ai.generate({
      prompt: `You are a helpful search assistant for a metallurgy and heat treatment website. 
      Your goal is to provide accurate and relevant answers or links to pages.
      Use the searchNavItems tool to find relevant pages.
      If you find a relevant page, return it as a 'page' type result.
      If the user asks a question you can answer directly, return it as an 'answer' type result.
      Provide up to 5 results.

      User query: "${input.query}"`,
      model: ai.getModel('googleai/gemini-2.5-flash'),
      tools: [searchNavItems],
      output: {
        schema: SearchOutputSchema,
      },
    });

    return llmResponse.output || { results: [] };
  }
);

// Export a wrapper function to be called from the API
export async function search(input: SearchInput): Promise<SearchOutput> {
  return searchFlow(input);
}
