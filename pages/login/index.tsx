import { GetServerSideProps } from 'next';
import React from 'react';

import Login from '@/components/Forms/LoginForm/Login';
import Layout from '@/components/Layout/Layout';

const Index: React.FC = () => (
    <>
        <Layout>
            <Login />
        </Layout>
    </>
);
export default Index;

export const getServerSideProps: GetServerSideProps = async context => {
    const token = context.req.cookies.tokenData;

    if (token) {
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
