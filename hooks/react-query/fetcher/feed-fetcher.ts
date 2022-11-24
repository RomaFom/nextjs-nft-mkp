// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
import { NFT } from '@/types/nft.type';

export const getFeed = (): Promise<NFT[]> =>
    fetch('/api/feed')
        .then(res => res.json())
        .then(data => data as NFT[]);
