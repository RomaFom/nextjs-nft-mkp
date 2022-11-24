'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

import Toast from '@/app/components/ToastContainer/Toast';
import UserProvider from '@/app/providers/UserProvider/UserProvider';
type Props = {
    children: React.ReactNode;
};

const Provider: React.FC<Props> = ({ children }) => {
    // Create a client
    const [queryClient] = React.useState(() => new QueryClient());
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Toast />
                <UserProvider>{children}</UserProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </>
    );
};
export default Provider;
