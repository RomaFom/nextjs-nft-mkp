import { GetServerSideProps } from 'next';
import React from 'react';

import MainFeed from '@/components/Feed/MainFeed';
import Layout from '@/components/Layout/Layout';
import { SSRProps } from '@/utils/app.types';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const HomePage: React.FC<SSRProps> = ({ token }) => (
    <>
        <Layout>
            <MainFeed />
        </Layout>
    </>
);

export default HomePage;

export const getServerSideProps: GetServerSideProps = async context => {
    const token = context.req.cookies.tokenData || '';

    return {
        props: {
            token,
        },
    };
};
