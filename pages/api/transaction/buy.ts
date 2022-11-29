import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { MarketplaceItemDto } from '@/types/nft.type';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<MarketplaceItemDto[] | any>,
): Promise<void> {
    try {
        const body = req.body;
        const token = req.headers.authorization;
        const response = await axios.post(
            process.env.CORE_API + 'transaction/buy-item',
            {
                ...body,
            },
            {
                headers: {
                    Authorization: token,
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
        console.log('error', error);
        res.status(500).send({ message: 'Internal server error' });
    }
}

// {
//     "tx_hash":"0x1213123423525tgfdgefg21111",
//   "item_id":69,
//   "nft_id":69,
//   "wallet":"0x012345"
// }
