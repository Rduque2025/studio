'use server';
/**
 * @fileOverview A utility to fetch customer feedback from a Google Sheet.
 *
 * This file defines the function for retrieving customer feedback data
 * from a Google Apps Script connected to a Google Sheet named "DATA".
 */

import { z } from 'zod';

// Define Zod schema for the feedback data structure
const CustomerFeedbackSchema = z.object({
  SERVICE: z.string().optional(),
  'CEDULA TITULAR': z.string().optional(),
  'NOMBRE TITULAR': z.string(),
  'LINEA DE NEGOCIO': z.string().optional(),
  CALIFICACIÓN: z.number(),
  COMENTARIO: z.string(),
  CATEGORÍA: z.enum(['PROMOTOR', 'DETRACTOR', 'NEUTRO']),
});

const CustomerFeedbackResponseSchema = z.array(CustomerFeedbackSchema);

export type CustomerFeedback = z.infer<typeof CustomerFeedbackSchema>;
export type CustomerFeedbackResponse = z.infer<typeof CustomerFeedbackResponseSchema>;

// The main exported function that the frontend will call
export async function getCustomerFeedback(): Promise<CustomerFeedbackResponse> {
  const scriptUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;

  if (!scriptUrl || scriptUrl === "TU_URL_DE_IMPLEMENTACIÓN_AQUÍ") {
    console.error("Apps Script URL is not configured.");
    return [];
  }

  try {
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({ action: 'getCustomerFeedback' }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success) {
      // Validate data with Zod schema
      return CustomerFeedbackResponseSchema.parse(data.data);
    } else {
      throw new Error(data.message || 'Failed to fetch customer feedback from Apps Script.');
    }
  } catch (error) {
    console.error('Error fetching customer feedback from Google Apps Script:', error);
    return [];
  }
}
