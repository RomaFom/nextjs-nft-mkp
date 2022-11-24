import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { NFT } from '@/types/nft.type';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<NFT[]>,
): Promise<void> {
    try {
        const response = await axios.get(process.env.CORE_API + 'web3/items');
        console.log(response);
        if (response.status >= 400) {
            return res.status(response.status).send(response.data as NFT[]);
        }
        res.status(200).send(response.data as NFT[]);
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}
