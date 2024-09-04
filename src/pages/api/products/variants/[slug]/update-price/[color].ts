import prisma from "@/src/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {slug, color} = req.query

    if (req.method === 'PATCH') {

        if (typeof color !== 'string' || typeof slug !== 'string') {
            return res.status(400).json({ error: 'Invalid color or slug' });
        }

        try {
            const product = await prisma.product.findUnique({
                where: { slug } 
            })

            if (!product) {
                return res.status(400).json({ error: 'Invalid product' });
            }

            await prisma.productVariant.update({
                where : { 
                    productId_color: {
                        productId: product?.id,
                        color: color
                    }
                 },
                 data: {
                    price: req.body.price
                 }
            })
            res.status(200).json({ message: 'Preço atualizado com sucesso!' })
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
