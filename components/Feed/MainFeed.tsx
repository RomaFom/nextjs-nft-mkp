import React from 'react';
import Card from '@/components/Card/Card';
import { GridLoader } from '@/components/Loaders/GridLoader';
import { NftGrid } from '@/components/NftGrid/NftGrid';
import { useGetFeed } from '@/hooks/react-query/useGetFeed';

const MainFeed: React.FC = () => {
    const { data, isLoading, error, refetch } = useGetFeed();

    return (
        <>
            <div className="fill-emerald-200">
                {isLoading && <GridLoader />}
                <NftGrid>
                    {data &&
                        data.map(item => (
                            <Card cb={refetch} item={item} key={item.itemId} />
                        ))}
                </NftGrid>
            </div>
        </>
    );
};
export default MainFeed;
