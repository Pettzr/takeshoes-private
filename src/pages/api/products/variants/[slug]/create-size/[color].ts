import prisma from "@/src/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { color, slug } = req.query;
        const { size } = req.body;

        try {
            if (typeof color !== 'string' || typeof slug !== 'string') {
                return res.status(400).json({ error: 'Invalid color or slug' });
            }

            const product = await prisma.product.findUnique({
                where: { slug: slug }
            });

            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            const variant = await prisma.productVariant.findUnique({
                where: {
                    productId_color: {
                        color,
                        productId: product.id
                    },
                },
                include: {
                    sizes: true 
                }
            });

            if (!variant) {
                return res.status(404).json({ error: 'Variant not found' });
            }

            const sizeExists = variant.sizes.some((s) => s.size === size.size);
            if (sizeExists) {
                return res.status(400).json({ error: 'Size already exists' });
            }

            await prisma.productVariant.update({
                where: {
                    productId_color: {
                        color,
                        productId: product.id
                    },
                },
                data: {
                    sizes: {
                        create: size
                    }
                }
            });

            return res.status(200).json({ message: 'Size added successfully' });

        } catch (error) {
            console.log(error as Error)
            return res.status(500).json({ error: 'Erro ao adicionar tamanho', details: (error as Error).message });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
}
