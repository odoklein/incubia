import axios from 'axios';
import type { Demand, DemandStatus } from './types';

const api = axios.create({ baseURL: '/api', headers: { 'Content-Type': 'application/json' } });

export async function fetchDemands(params?: { type?: string; status?: DemandStatus }): Promise<Demand[]> {
  const res = await api.get<Demand[]>('/demands', { params });
  return res.data;
}

export async function fetchDemand(id: string): Promise<Demand> {
  const res = await api.get<Demand>(`/demands/${id}`);
  return res.data;
}

export async function updateDemandStatus(id: string, status: DemandStatus): Promise<void> {
  await api.put(`/demands/${id}/status`, { status });
}

export async function addDemandNote(id: string, content: string): Promise<void> {
  await api.post(`/demands/${id}/notes`, { content });
}
