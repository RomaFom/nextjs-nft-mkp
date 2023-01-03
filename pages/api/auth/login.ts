import { IFormSignUp } from '@/components/Forms/SignUpForm/types';
import { ApiAuth } from '@/utils/api';
import { IUserResponse } from '@/utils/api/types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IUserResponse>,
): Promise<void> {
    try {
        const body: IFormSignUp = req.body;
        const response = await ApiAuth.login(body);
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}
