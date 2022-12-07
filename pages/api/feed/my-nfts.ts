import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { MarketplaceItemDto } from '@/types/nft.type';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<MarketplaceItemDto[] | any>,
): Promise<void> {
    try {
        // const { page, size } = req.query;
        const wallet = req.headers.wallet as string;
        const token = req.headers.authorization as string;
        const response = await axios.get(
            process.env.CORE_API + 'marketplace/my-purchases',
            {
                headers: {
                    Authorization: token,
                    wallet: wallet,
                },
            },
        );

        if (response.status >= 400) {
            return res
                .status(response.status)
                .send(response.data as MarketplaceItemDto[]);
        }
        res.status(200).send(response.data as MarketplaceItemDto[]);
    } catch (error) {
        res.status(500).send('error');
    }
}
