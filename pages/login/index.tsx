import React from 'react';

import Login from '@/components/Forms/LoginForm/Login';
import Layout from '@/components/Layout/Layout';
import { parseCookie } from '@/utils/api/parseCookie';

const Index: React.FC = () => (
    <>
        <Layout>
            <Login />
        </Layout>
    </>
);
export default Index;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function getServerSideProps(context: any) {
    const cookies = context.req.headers.cookie || '';

    const parsed = parseCookie(cookies);
    if (parsed) {
        return {
            redirect: {
                destination: '/',
            },
        };
    }
    return {
        props: {},
    };
}
