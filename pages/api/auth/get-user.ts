import type { NextApiRequest, NextApiResponse } from "next";

import { ApiAuth } from "@/utils/api";
import { IUserDataResponse } from "@/utils/api/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUserDataResponse>
): Promise<void> {
  try {
    const response = await ApiAuth.getUserData(
      req.headers.authorization as string
    );
    if (response.status >= 400) {
      return res.status(response.status).send(response);
    }
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}
