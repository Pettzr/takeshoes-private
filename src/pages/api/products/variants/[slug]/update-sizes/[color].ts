import prisma from "@/src/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { slug } = req.query;

    
    if (req.method === 'PATCH') {
        try {
            const { color } = req.query;
            const { sizes } = req.body; 

            if (typeof color !== 'string' || typeof slug !== 'string') {
                return res.status(400).json({ error: 'Invalid color or slug' });
            }

            const product = await prisma.product.findUnique({ 
                where: { slug }
            });

            if (!product) {
                return res.status(404).json({ error: 'Product not found!' });
            }


            const updatePromises = sizes.map((size: SizeData) => {
                return prisma.productVariant.update({
                    where: { 
                        productId_color: {
                            productId: product.id,
                            color: color,
                        },
                    },
                    data: {
                        sizes: {
                            update: {
                                where: { id: size.id }, 
                                data: {
                                    quantity: size.quantity,
                                },
                            },
                        },
                    },
                });
            });

            await Promise.all(updatePromises); 

            res.status(200).send('Tamanhos atualizados com sucesso');
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar tamanhos', details: (error as Error).message });
        }
    } else {
        // Responde com um método não permitido se não for PATCH
        res.setHeader('Allow', ['PATCH']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
