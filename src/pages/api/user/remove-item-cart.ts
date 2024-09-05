import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/src/lib/prisma";


export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        const { itemId } = req.body

        const itemCart = await prisma.cart.delete({
            where: { id: itemId }
        })

        if (!itemCart){
            res.status(400).json({message: 'id não encontrado.'})
        }

        res.status(200).json({message: 'Item deletado com sucesso!'})

    } else {
        res.setHeader('Allow', ['PATCH']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}