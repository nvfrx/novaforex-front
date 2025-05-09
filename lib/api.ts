// lib/api.ts
import api from "./axios";

export interface Stats {
  totalInvested: number;
  dailyProfit: number;
  networkEarnings: number;
  withdrawalsPending: number;
}

export async function fetchDashboardStats(): Promise<Stats> {
  const { data } = await api.get("/dashboard/stats");
  return data;
}
