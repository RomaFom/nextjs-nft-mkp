import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const PAGE_SIZE = 10;
const UseGetMyNfts = (): any => {
    const { status, data, isFetchingNextPage, fetchNextPage, refetch } =
        useInfiniteQuery(
            ['my-nfts'],
            async ({ pageParam = 0 }) => {
                const res = await axios.get(
                    `/api/feed/my-nfts?page=${pageParam}&size=${PAGE_SIZE}`,
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

    return {
        status,
        data,
        isFetchingNextPage,
        fetchNextPage,
        refetch,
    };
};
export default UseGetMyNfts;
