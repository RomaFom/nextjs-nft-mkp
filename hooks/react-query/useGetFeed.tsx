import { useQuery } from '@tanstack/react-query';
import { getFeed } from '@/hooks/react-query/fetcher/feed-fetcher';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useGetFeed() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['feed'],
        queryFn: getFeed,
        refetchInterval: 1000 * 60,
        refetchOnWindowFocus: false,
    });
    return { data, isLoading, error };
}
