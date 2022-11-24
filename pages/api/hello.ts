// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    name: string;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    console.log('HERE');
    res.status(200).json({ name: 'John Doe' });
}
