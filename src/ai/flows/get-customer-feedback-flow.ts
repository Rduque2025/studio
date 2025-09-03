'use server';
/**
 * @fileOverview A utility to fetch customer feedback from a Google Sheet.
 *
 * This file defines the function for retrieving customer feedback data
 * from a Google Apps Script connected to a Google Sheet named "DATA".
 */

import { z } from 'zod';

// Define Zod schema for the feedback data structure
// This schema now coerces (converts) the CALIFICACIÓN field to a number,
// which makes it robust against cases where the sheet might send it as a string.
const CustomerFeedbackSchema = z.object({
  SERVICE: z.string().optional(),
  'CEDULA TITULAR': z.string().optional(),
  'NOMBRE TITULAR': z.string(),
  'LINEA DE NEGOCIO': z.string().optional(),
  CALIFICACIÓN: z.coerce.number(), // Use z.coerce.number() to handle string or number values
  COMENTARIO: z.string(),
  CATEGORÍA: z.enum(['PROMOTOR', 'DETRACTOR', 'NEUTRO']),
});

const CustomerFeedbackResponseSchema = z.array(CustomerFeedbackSchema);

export type CustomerFeedback = z.infer<typeof CustomerFeedbackSchema>;
export type CustomerFeedbackResponse = z.infer<typeof CustomerFeedbackResponseSchema>;

// The main exported function that the frontend will call
export async function getCustomerFeedback(): Promise<CustomerFeedbackResponse> {
  const scriptUrl = process.env.NEXT_PUBLIC_FEEDBACK_APPS_SCRIPT_URL;

  if (!scriptUrl || scriptUrl === "TU_NUEVA_URL_DE_IMPLEMENTACIÓN_AQUÍ") {
    console.error("Feedback Apps Script URL is not configured.");
    return [];
  }

  try {
    // Simplified the fetch call to a direct POST without a body,
    // as the dedicated script has only one function.
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Apps Script fetch error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success) {
      // Filter out any potential empty or incomplete rows from the sheet data before parsing
      const nonEmptyData = data.data.filter((row: any) => 
        row['NOMBRE TITULAR'] && row['COMENTARIO'] && row['CATEGORÍA'] && row['CALIFICACIÓN'] !== undefined
      );
      // Validate data with the more robust Zod schema
      return CustomerFeedbackResponseSchema.parse(nonEmptyData);
    } else {
      throw new Error(data.message || 'Failed to fetch customer feedback from Apps Script.');
    }
  } catch (error) {
    console.error('Error fetching or parsing customer feedback from Google Apps Script:', error);
    return [];
  }
}
