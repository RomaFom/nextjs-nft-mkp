import Head from 'next/head';
import Provider from '@/providers/Provider';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>NFT Marketplace</title>
            </Head>
            <Provider>
                <Component {...pageProps} />
            </Provider>
        </>
    );
}
