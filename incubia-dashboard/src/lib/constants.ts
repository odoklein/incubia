// src/lib/constants.ts

import { DemandStatus, DemandType } from './types';

// Pour boucler sur les filtres, les badges, etc.
export const DEMAND_TYPES: DemandType[] = ['mentor', 'investor', 'startup'];
export const DEMAND_STATUSES: DemandStatus[] = [
  'Nouveau',
  'Confirmé',
  'Abandonné',
  'En attente',
];
