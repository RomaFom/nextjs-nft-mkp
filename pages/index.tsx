import React from 'react';

import MainFeed from '@/components/Feed/MainFeed';
import Layout from '@/components/Layout/Layout';
import { parseCookie } from '@/utils/api/parseCookie';
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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function getServerSideProps(context: any) {
    const cookies = context.req.headers.cookie || '';
    const parsed = parseCookie(cookies);
    return {
        props: {
            token: parsed,
        }, // will be passed to the page component as props
    };
}
