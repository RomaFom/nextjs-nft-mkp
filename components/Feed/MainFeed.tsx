import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Card from '@/components/Card';
import BuyNftButton from '@/components/Card/ActionButtons/BuyNftButton';
import { BarLoader } from '@/components/Loaders';
import { GridLoader } from '@/components/Loaders';
import NftGrid from '@/components/NftGrid';
import { MarketplaceItemDto } from '@/types/nft.type';

const PAGE_SIZE = 10;
const MainFeed: React.FC = () => {
    const { ref, inView } = useInView();
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
                        data.pages.map((page, index) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <React.Fragment key={index}>
                                {page &&
                                    page.map((item: MarketplaceItemDto) => (
                                        <Card
                                            actionButton={
                                                <BuyNftButton
                                                    cb={refetch}
                                                    item={item}
                                                />
                                            }
                                            item={item}
                                            key={item.item_id}
                                        />
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
