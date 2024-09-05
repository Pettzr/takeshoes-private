import prisma from "@/src/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { slug } = req.query;
    
    if (req.method === 'DELETE') {
        try {
            const { color } = req.query;
            
            if (typeof color !== 'string' || typeof slug !== 'string') {
                return res.status(400).json({ error: 'Invalid color or slug' });
            }

            const product = await prisma.product.findUnique({ 
                where: { slug }
            });

            if (!product) {
                return res.status(404).json({ error: 'Product not found!' });
            } 

            await prisma.productVariant.delete({
                where: { 
                    productId_color: {
                        productId: product.id,
                        color: color
                    }
                },
            });

            const remainingVariants = await prisma.productVariant.count({
                where: { productId: product.id }
            });

            if (remainingVariants === 0) {
                await prisma.product.delete({
                    where: { id: product.id }
                });

                return res.status(200).json({ message: 'Produto e variante deletados com sucesso', productDeleted: true });
            }

            res.status(200).json({ message: 'Variante deletada com sucesso', productDeleted: false });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar variante', details: (error as Error).message });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
