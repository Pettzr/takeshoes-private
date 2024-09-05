import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/src/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if( req.method === 'GET'){
        const session = await getServerSession(req, res, authOptions)
        const email = session?.user.email;

        if(!email) {
            return res.status(404).json({message: 'Email not found!'})
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if(!user) {
            return res.status(404).json({message: 'User not found!'})
        }

        const cartItems = await prisma.cart.findMany({
            where: {userId: user?.id},
        })

        return res.status(200).json(cartItems)
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}