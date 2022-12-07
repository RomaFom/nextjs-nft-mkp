import React from 'react';
import MyNfts from '@/components/Feed/MyNfts';
import { useDapp } from '@/providers/DappContext';

const Index: React.FC = () => {
    const { wallet } = useDapp();
    return <>{wallet && <MyNfts />}</>;
};

// export async function getServerSideProps({ req, res }) {
//     console.log('token', req.cookies.tokenData);
//     // console.log('session', req.session);
//     return {
//         props: {}, // Will be passed to the page component as props
//     };
// }

export default Index;
