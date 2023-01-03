import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        const { page, size } = req.query;
        const wallet = req.cookies.wallet;
        const token = req.cookies.tokenData;

        const response = await axios.get(
            process.env.CORE_API +
                `marketplace/my-purchases?page=${page}&size=${size}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    wallet: wallet,
                },
            },
        );

        res.status(200).send(response.data);
    } catch (error) {
        res.status(500).send('error');
    }
}
