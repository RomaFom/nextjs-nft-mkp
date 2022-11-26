import {
    QueryClient,
    QueryClientProvider,
    useInfiniteQuery,
} from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Card from '@/components/Card/Card';
import { GridLoader } from '@/components/Loaders/GridLoader';
import { NftGrid } from '@/components/NftGrid/NftGrid';
import { useGetFeed } from '@/hooks/react-query/useGetFeed';
import { NFT } from '@/types/nft.type';

const PAGE_SIZE = 10;
const MainFeed: React.FC = () => {
    const { ref, inView } = useInView();
    // const { data, isLoading, error, refetch } = useGetFeed();

    const {
        status,
        data,
        error,
        isFetching,
        isFetchingNextPage,
        isFetchingPreviousPage,
        fetchNextPage,
        refetch,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
    } = useInfiniteQuery(
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
                    return allPages.length + 1;
                }

                return undefined;

                // const nextPage = allPages.length + 1;
                // return nextPage;
            },
        },
    );

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [inView]);

    return (
        <>
            <div className="fill-emerald-200">
                {status === 'loading' && <GridLoader />}
                <NftGrid>
                    {data &&
                        data.pages.map(page => (
                            // <Card cb={refetch} item={item} key={item.itemId} />
                            <React.Fragment key={page.nextId}>
                                {page &&
                                    page.map((item: NFT) => (
                                        <>
                                            <Card
                                                cb={refetch}
                                                item={item}
                                                key={item.itemId}
                                            />
                                        </>
                                    ))}
                            </React.Fragment>
                        ))}
                </NftGrid>
            </div>
            <div ref={ref}>{isFetchingNextPage && 'Loading'}</div>
        </>
    );
};
export default MainFeed;
