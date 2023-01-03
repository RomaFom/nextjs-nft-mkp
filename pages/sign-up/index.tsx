import { GetServerSideProps } from 'next';
import React from 'react';

import SignUp from '@/components/Forms/SignUpForm/SignUp';
import Layout from '@/components/Layout/Layout';

const Index: React.FC = () => (
    <>
        <Layout>
            <SignUp />
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
