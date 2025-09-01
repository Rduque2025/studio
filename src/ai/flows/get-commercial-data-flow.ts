'use server';
/**
 * @fileOverview A utility to fetch commercial dashboard data.
 *
 * This file defines the data structures and the function for retrieving
 * data for the "Gerencia Comercial" dashboard. Currently, it returns
 * mock data, but it is structured to be easily connected to a live
 * data source like Google Sheets.
 */

import { z } from 'zod';

// Define Zod schemas for the data structures

const KpiSchema = z.object({
  value: z.number(),
  change: z.number(),
});

const KpisSchema = z.object({
  monthlySales: KpiSchema,
  monthlyCollection: KpiSchema,
  newClients: KpiSchema,
});

const SalesTrendItemSchema = z.object({
  name: z.string(),
  currentMonth: z.number(),
  previousMonth: z.number(),
});

const SalesForceItemSchema = z.object({
  month: z.string(),
  value: z.number(),
  budget: z.number(),
});

const TopExecutiveSchema = z.object({
  name: z.string(),
  sales: z.number(),
  avatar: z.string(),
});

const CommercialDataSchema = z.object({
  kpis: KpisSchema,
  salesTrend: z.array(SalesTrendItemSchema),
  salesForce: z.array(SalesForceItemSchema),
  topExecutives: z.array(TopExecutiveSchema),
});

export type CommercialData = z.infer<typeof CommercialDataSchema>;

// The main exported function that the frontend will call
export async function getCommercialData(): Promise<CommercialData> {
  //
  // TODO: Replace this mock data with a real data fetch from Google Sheets
  //
  // Example using a hypothetical 'fetchFromGoogleSheets' function:
  //
  // const sheetData = await fetchFromGoogleSheets('YOUR_SHEET_ID', 'YOUR_RANGE');
  // const formattedData = transformSheetDataToCommercialData(sheetData);
  // return formattedData;
  //
  // Or calling your Apps Script endpoint:
  // const response = await fetch('YOUR_APPS_SCRIPT_WEB_APP_URL');
  // const sheetData = await response.json();
  // const formattedData = transformSheetDataToCommercialData(sheetData.data);
  // return formattedData;

  // Returning mock data for now
  return {
    kpis: {
      monthlySales: { value: 750000, change: 15.2 },
      monthlyCollection: { value: 690000, change: 5.7 },
      newClients: { value: 1230, change: -2.1 },
    },
    salesTrend: [
      { name: 'Ene', currentMonth: 2300, previousMonth: 1900 },
      { name: 'Feb', currentMonth: 2100, previousMonth: 2200 },
      { name: 'Mar', currentMonth: 3200, previousMonth: 2500 },
      { name: 'Abr', currentMonth: 2800, previousMonth: 3000 },
      { name: 'May', currentMonth: 3500, previousMonth: 3100 },
      { name: 'Jun', currentMonth: 4100, previousMonth: 3600 },
    ],
    salesForce: [
      { month: 'Ene', value: 250, budget: 400 },
      { month: 'Feb', value: 280, budget: 400 },
      { month: 'Mar', value: 350, budget: 400 },
      { month: 'Abr', value: 320, budget: 400 },
      { month: 'May', value: 410, budget: 400 },
      { month: 'Jun', value: 450, budget: 400 },
    ],
    topExecutives: [
      { name: 'Ana Pérez', sales: 120000, avatar: 'AP' },
      { name: 'Carlos Rivas', sales: 110000, avatar: 'CR' },
      { name: 'Sofía Castillo', sales: 95000, avatar: 'SC' },
      { name: 'Luis Mendez', sales: 80000, avatar: 'LM' },
    ],
  };
}
