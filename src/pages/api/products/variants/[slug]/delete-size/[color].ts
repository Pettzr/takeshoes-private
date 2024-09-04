import prisma from "@/src/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'DELETE') {
        const { slug } = req.query
        const { color } = req.query
        const { id } = req.body
        try {
            if (typeof color !== 'string' || typeof slug !== 'string'){
                return res.status(400).json({error: 'Invalid color'})
            }
            const product = await prisma.product.findUnique({
                where: { slug }
            });

            if (!product) {
                return res.status(404).json({  error: 'Product  not found'})
            }

            const variant = await prisma.productVariant.findUnique({
                where: {
                    productId_color : {
                        productId: product.id,
                        color: color
                    }
                }
            })
        
            
            if (!variant) {
                return res.status(404).json({  error: 'Variant  not found'})
            }

            await prisma.size.delete({
                where : {
                    variantId_id: {
                        variantId: variant.id,
                        id: id
                    }
                }
            })
            
            return res.status(200).json({message: 'Tamanho deletado com sucesso!'})
        } catch(error) {
            res.status(500).json({ error: 'Erro ao deletar tamanho', details: (error as Error).message })
        }
    }
}