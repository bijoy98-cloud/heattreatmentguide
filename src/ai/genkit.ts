import {genkit, ai} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Correctly initialize Genkit with plugins first.
genkit({
  plugins: [googleAI()],
});

// Now that Genkit is configured, the 'ai' object is available to use.
ai.registerModel('googleai/gemini-2.5-flash', googleAI({version: '2.5-flash'}));

export {ai};
