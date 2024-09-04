import prisma from "@/src/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { slug } = req.query
    if(req.method === 'PATCH') {
        try {
            const { color } = req.query
            const { images } = req.body
            if  (typeof color !== 'string' || typeof slug !== 'string') {
                return res.status(400).json({error: 'Invalid color'})
            }

            const product = await prisma.product.findUnique({ 
                where: { slug }
            });

            if (!product) {
                return res.status(404).json({ error: 'Product not found!'})
            } 
            await prisma.productVariant.update({
                where: { 
                    productId_color: {
                        productId: product.id,
                        color: color
                    },
               },
               data: {
                images: images
               }
                
            })
        res.status(200).send('Imagens atualizadas com sucesso')
        } catch(error){
            res.status(500).json({ error: 'Erro ao deletar variante', details: (error as Error).message })
        }
    }
}