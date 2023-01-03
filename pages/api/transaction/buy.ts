import axios, { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        const body = req.body;
        const token = req.headers.authorization;
        const response: AxiosResponse = await axios.post(
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

        res.status(200).send(response.data);
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
