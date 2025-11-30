
import { config } from 'dotenv';
config();

import '@/ai/flows/recommend-heat-treatment-parameters.ts';
import '@/ai/flows/generate-video-summary.ts';
import '@/ai/flows/recommend-process-flow.ts';
import '@/ai/flows/suggest-carburizing-process-flow.ts';
import '@/ai/flows/suggest-heat-treatment-flow.ts';
import '@/ai/flows/diagnose-fault-flow.ts';
import '@/ai/flows/analyze-microstructure-flow.ts';

