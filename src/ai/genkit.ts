
import {genkit, ai} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

// Correctly initialize Genkit with plugins first.
genkit({
  plugins: [googleAI()],
});

// Now that Genkit is configured, the 'ai' object is available to use.
const geminiPro = ai.getModel('googleai/gemini-pro');

export {ai, geminiPro};
