import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { MarketplaceItemDto } from '@/types/nft.type';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<MarketplaceItemDto[] | any>,
): Promise<void> {
    try {
        const { page, size } = req.query;
        const response = await axios.get(
            process.env.CORE_API +
                `marketplace/get-all?page=${page}&size=${size}`,

            // process.env.CORE_API + `web3/items?page=${page}&size=${size}`,
        );

        res.status(200).send(response.data as MarketplaceItemDto[]);
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
}
