// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { IFormInputValues } from '@/ignoreFolder/components/Forms/SignUpForm/types';
import { ApiAuth } from '@/utils/api';
import { IUserResponse } from '@/utils/api/types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IUserResponse>,
): Promise<void> {
    try {
        const body: IFormInputValues = JSON.parse(req.body);
        const response = await ApiAuth.signUp(body);
        if (response.status >= 400) {
            return res.status(response.status).send(response);
        }
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(500);
    }
}
