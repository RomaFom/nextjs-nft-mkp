'use client';
// import dynamic from 'next/dynamic';
import React from 'react';
import { useGetFeed } from '@/hooks/react-query/useGetFeed';
import Card from '@/ignoreFolder/components/Card/Card';
import { GridLoader } from '@/ignoreFolder/components/Loaders/GridLoader';
import { NftGrid } from '@/ignoreFolder/components/NftGrid/NftGrid';

const MainFeed: React.FC = () => {
    const { data, isLoading, error } = useGetFeed();

    return (
        <>
            <div className="fill-emerald-200">
                {isLoading && <GridLoader />}
                <NftGrid>
                    {data &&
                        data.map(item => (
                            <Card item={item} key={item.itemId} />
                        ))}
                </NftGrid>
            </div>
        </>
    );
};
export default MainFeed;
