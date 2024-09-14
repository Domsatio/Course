import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getDashboard } from "@/controllers/dashboard.controller";
// import { cookies } from 'next/headers';
// import {getCookies} from 'cookies-next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });
  if (req.method === "GET") {
    if (!token || token.role !== "ADMIN") {
      res.status(401).json({ message: "Forbidden" });
      return;
    }
    try {
      const data = await getDashboard();
      return res.status(200).send({
        status: true,
        statusCode: 200,
        message: "Get product success",
        data,
      });
    } catch (error) {
      console.error("ERR: dashboard - get = ", error);
      return res
        .status(422)
        .send({ status: false, statusCode: 422, message: error });
    }
  } else {
    res.status(405).end();
  }
}
