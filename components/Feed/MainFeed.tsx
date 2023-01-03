import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Card from '@/components/Card';
import BuyNftButton from '@/components/Card/ActionButtons/BuyNftButton';
import { BarLoader } from '@/components/Loaders';
import { GridLoader } from '@/components/Loaders';
import NftGrid from '@/components/NftGrid';
import { useGetFeed } from '@/hooks/react-query/useGetFeed';
import { MarketplaceItemDto } from '@/types/nft.type';

const MainFeed: React.FC = () => {
    const { ref, inView } = useInView();
    const { status, data, isFetchingNextPage, fetchNextPage, refetch } =
        useGetFeed();

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
