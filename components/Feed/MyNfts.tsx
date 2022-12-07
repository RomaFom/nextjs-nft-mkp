import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useInView } from 'react-intersection-observer';
import Card from '@/components/Card';
import BuyNftButton from '@/components/Card/ActionButtons/BuyNftButton';
import { BarLoader, GridLoader } from '@/components/Loaders';
import NftGrid from '@/components/NftGrid';
import { useDapp } from '@/providers/DappContext';
import { useUser } from '@/providers/UserProvider/UserContext';
import { MarketplaceItemDto } from '@/types/nft.type';

const MyNfts: React.FC = () => {
    const { ref, inView } = useInView();
    const { wallet } = useDapp();
    const [cookie] = useCookies(['tokenData']);
    const { status, data, isFetchingNextPage, fetchNextPage, refetch } =
        useInfiniteQuery(
            ['my-nfts'],
            async ({ pageParam = 1 }) => {
                const res = await axios.get('/api/feed/my-nfts', {
                    headers: {
                        wallet: wallet,
                        Authorization: `Bearer ${cookie.tokenData}`,
                    },
                });
                return res.data;
            },
            {
                getPreviousPageParam: firstPage =>
                    firstPage.previousId ?? undefined,
                getNextPageParam: (lastPage, allPages) =>
                    // if (lastPage.length) {
                    //     return allPages.length + 1;
                    // }
                    undefined,
                enabled: !!wallet,
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
export default MyNfts;
