'use client';
import { ThirdwebWeb3Provider } from '@3rdweb/hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import NavBar from '@/components/NavBar/NavBar';

import 'regenerator-runtime/runtime';
import Toast from '@/ignoreFolder/components/ToastContainer/Toast';
import UserProvider from '@/ignoreFolder/providers/UserProvider/UserProvider';
type Props = {
    children: React.ReactNode;
};

const supportedChainIds = [1337];
const connectors = {
    injected: {},
};

const Provider: React.FC<Props> = ({ children }) => {
    // Create a client
    const [queryClient] = React.useState(() => new QueryClient());

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Toast />
                <UserProvider>
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    <ThirdwebWeb3Provider
                        connectors={connectors}
                        supportedChainIds={supportedChainIds}
                    >
                        <NavBar />
                        <main className="pt-20 px-3 h-full">{children}</main>
                    </ThirdwebWeb3Provider>
                </UserProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </>
    );
};
export default Provider;
