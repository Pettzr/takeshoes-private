import prisma from "@/src/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'GET') {
        try {
            const productsNames = await prisma.product.findMany({
                select: { name: true, id: true, slug: true, variant: true, }
            })
            if (productsNames.length > 0) {
                res.status(200).json(productsNames)
            } else {
                res.status(404).json({ error: 'Nenhum produto encontrado' })
            }       
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar produtos', details: (error as Error).message })
    
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}