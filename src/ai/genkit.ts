import {genkit, ai} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

genkit({
  plugins: [googleAI()],
});

ai.registerModel('googleai/gemini-2.5-flash', googleAI({version: '2.5-flash'}));

export {ai};
