import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ethers } from 'ethers';
import React from 'react';
import NavBar from '@/components/NavBar/NavBar';
import 'regenerator-runtime/runtime';
import Toast from '@/components/ToastContainer/Toast';

import { Marketplace } from '@/contract-integration/marketplace';
import useWeb3 from '@/hooks/useWeb3';
import { DappContext, IDappCtx } from '@/providers/DappContext';
import UserProvider from '@/providers/UserProvider/UserProvider';

type Props = {
    children: React.ReactNode;
};

const Provider: React.FC<Props> = ({ children }) => {
    // Create a client
    const [queryClient] = React.useState(() => new QueryClient());
    const { account, owner, marketPlace, nft, web3Handler } = useWeb3();

    const dappCtxValues: IDappCtx = {
        nftContract: nft,
        marketplaceContract: marketPlace,
        wallet: account,
        owner: owner,
        web3Handler: web3Handler,
        Mkp: new Marketplace(marketPlace as ethers.Contract),
    };

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Toast />
                <UserProvider>
                    <DappContext.Provider value={dappCtxValues}>
                        {children}
                        {/*<NavBar />*/}
                        {/*<main className="pt-20 px-3 h-full">{children}</main>*/}
                    </DappContext.Provider>
                </UserProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </>
    );
};
export default Provider;
