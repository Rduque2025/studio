'use server';
/**
 * @fileOverview A utility to fetch weekly menu items from a Google Sheet.
 *
 * This file defines the function for retrieving menu data
 * from a Google Apps Script connected to a Google Sheet.
 */

import { z } from 'zod';

const MenuItemSchema = z.object({
  id: z.string(),
  day: z.string(),
  name: z.string(),
  description: z.string().optional(), // Description might not be in the sheet, making it optional.
  imageUrl: z.string(),
  price: z.string().optional(),
  type: z.enum(['Clásico', 'Dieta', 'Ejecutivo']),
});

const MenuItemsResponseSchema = z.array(MenuItemSchema);

export type MenuItem = z.infer<typeof MenuItemSchema>;
export type MenuItemsResponse = z.infer<typeof MenuItemsResponseSchema>;

// The main exported function that the frontend will call
export async function getMenuItems(): Promise<MenuItemsResponse> {
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
      body: JSON.stringify({ action: 'getMenuItems' }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success) {
      // Validate data with Zod schema
      return MenuItemsResponseSchema.parse(data.data);
    } else {
      throw new Error(data.message || 'Failed to fetch menu items from Apps Script.');
    }
  } catch (error) {
    console.error('Error fetching menu items from Google Apps Script:', error);
    return [];
  }
}
