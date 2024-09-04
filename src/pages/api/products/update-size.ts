import prisma from "@/src/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.body
    if (req.method === 'PATCH') {
        try {
            await prisma.size.update({
                where : { id },
                data : {
                    quantity: req.body.quantity,
                }
            })
            res.status(200).json({ message: 'Tamanho atualizado com sucesso!' })
        }
        catch(error) {
            res.status(500).json({ error: 'Erro ao atualizar o tamanho', details: (error as Error).message })
        }
    }
    else {
        res.setHeader('Allow', ['PATCH']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
