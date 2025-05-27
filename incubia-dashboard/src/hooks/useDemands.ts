import { useQuery } from '@tanstack/react-query';
import { fetchDemands } from '@/lib/api';
import type { Demand } from '@/lib/types';

export function useDemands(type?: string) {
  return useQuery<Demand[], Error>({
    queryKey: ['demands', type],
    queryFn: () => fetchDemands({ type }),
    refetchInterval: 30_000,
    refetchOnWindowFocus: true,
  });
}
