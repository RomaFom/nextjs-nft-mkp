'use client';
// import dynamic from 'next/dynamic';
import React from 'react';
import Card from '@/app/components/Card/Card';
import { GridLoader } from '@/app/components/Loaders/GridLoader';
import { NftGrid } from '@/app/components/NftGrid/NftGrid';
import { useGetFeed } from '@/hooks/react-query/useGetFeed';

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
