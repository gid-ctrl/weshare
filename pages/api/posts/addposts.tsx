import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method === "POST"){
        const session = await getServerSession(req,res, authOptions)
        if (!session)
        return res.status(401).json({mesage: "Please sign in"})
   
        console.log(req.body)
    }
}