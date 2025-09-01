/**
 * @fileoverview This file initializes the Genkit AI framework.
 *
 * It is used to define and configure AI models, flows, and other components.
 */

import { genkit } from 'genkit';
import nextJS from '@genkit-ai/next';

// Initialize Genkit with only the NextJS plugin as Gemini is not being used.
export const ai = genkit({
  plugins: [nextJS()],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
