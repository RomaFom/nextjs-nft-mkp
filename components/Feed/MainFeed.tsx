import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Card from '@/components/Card';
import { BarLoader } from '@/components/Loaders';
import { GridLoader } from '@/components/Loaders';
import NftGrid from '@/components/NftGrid';
import { MarketplaceItemDto } from '@/types/nft.type';

const PAGE_SIZE = 10;
const MainFeed: React.FC = () => {
    const { ref, inView } = useInView();
    const { status, data, isFetchingNextPage, fetchNextPage } =
        useInfiniteQuery(
            ['feed'],
            async ({ pageParam = 1 }) => {
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
                            <React.Fragment key={page.nextId}>
                                {page &&
                                    page.map((item: MarketplaceItemDto) => (
                                        <>
                                            <Card
                                                // cb={refetch}
                                                item={item}
                                                key={item.itemId}
                                            />
                                        </>
                                    ))}
                            </React.Fragment>
                        ))}
                </NftGrid>
            </div>
            <div className={'py-8'} ref={ref}>
                {isFetchingNextPage && <BarLoader />}
            </div>
        </>
    );
};
export default MainFeed;
