'use server';
/**
 * @fileOverview A utility to fetch team members from a Google Sheet.
 * This file defines the function for retrieving employee data
 * from a dedicated Google Apps Script connected to a Google Sheet named "TeamMembers".
 */

import { z } from 'zod';

// Define a Zod schema for the team member data structure.
// This schema matches the required columns from the Google Sheet.
const TeamMemberSchema = z.object({
  Nombre: z.string().default('No disponible'),
  Correo: z.string().email().optional(),
  Cargo: z.string().default('No especificado'),
  Area: z.string().default('General'),
  Tipo: z.enum(['Personal', 'Líderes']).default('Personal'),
  UrlContacto: z.string().url().optional(),
  Descripcion: z.string().default('Sin descripción.'),
  ImageUrl: z.string().url().optional(),
});

// Define the schema for the entire response array
const TeamMembersResponseSchema = z.array(TeamMemberSchema);

export type TeamMember = z.infer<typeof TeamMemberSchema>;
export type TeamMembersResponse = z.infer<typeof TeamMembersResponseSchema>;

/**
 * The main exported function that the frontend will call.
 * It fetches data from the dedicated team Apps Script.
 */
export async function getTeamMembers(): Promise<TeamMembersResponse> {
  const scriptUrl = process.env.NEXT_PUBLIC_TEAM_APPS_SCRIPT_URL;

  // Check if the URL is configured in the environment variables
  if (!scriptUrl || scriptUrl === "TU_URL_DE_APPS_SCRIPT_PARA_EQUIPO_AQUÍ") {
    console.error("Team Apps Script URL is not configured in .env file.");
    // Return an empty array if the URL is not set to prevent app crashes
    return [];
  }

  try {
    // Perform a simple POST request as required by Google Apps Script web apps
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      // An empty body is sufficient for a simple GET-like script
      body: '',
    });

    // Check for network or server errors
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Check if the script execution was successful
    if (data.success) {
      // Filter out any potential empty or incomplete rows before parsing
      const cleanData = data.data.filter((row: any) => row['Nombre']);
      // Validate the cleaned data with our Zod schema
      return TeamMembersResponseSchema.parse(cleanData);
    } else {
      // Throw an error if the script reported a failure
      throw new Error(data.message || 'Failed to fetch team members from Apps Script.');
    }
  } catch (error) {
    console.error('Error fetching or parsing team member data:', error);
    // Return an empty array on any failure to ensure the app remains stable
    return [];
  }
}
