import {genkit, ai} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

ai.registerModel('googleai/gemini-2.5-flash', googleAI({version: '2.5-flash'}));

genkit({
  plugins: [googleAI()],
});

export {ai};
