import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const PAGE_SIZE = 10;
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useGetFeed() {
    const { status, data, isFetchingNextPage, fetchNextPage, refetch } =
        useInfiniteQuery(
            ['feed'],
            async ({ pageParam = 0 }) => {
                const res = await axios.get(
                    `/api/feed?page=${pageParam}&size=${PAGE_SIZE}`,
                );
                return res.data;
            },
            {
                getPreviousPageParam: firstPage =>
                    firstPage.previousId ?? undefined,
                getNextPageParam: (lastPage, allPages) => {
                    if (lastPage.length === PAGE_SIZE) {
                        return allPages.length;
                    }
                    return undefined;
                },
            },
        );
    return { status, data, isFetchingNextPage, fetchNextPage, refetch };
}
