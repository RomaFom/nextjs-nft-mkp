import { GetServerSideProps } from 'next';
import React from 'react';
import MyNfts from '@/components/Feed/MyNfts';
import Layout from '@/components/Layout/Layout';

const Index: React.FC = () => (
    <>
        <Layout>
            <MyNfts />
        </Layout>
    </>
);
export const getServerSideProps: GetServerSideProps = async context => {
    const { wallet, tokenData } = context.req.cookies;
    if (!wallet || !tokenData) {
        return {
            redirect: {
                destination: '/',
            },
            props: {},
        };
    }
    return {
        props: {},
    };
};

export default Index;
