import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/src/lib/prisma'; 

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        let {user, data, size, variant, quantity} = req.body

        try {

            user = await prisma.user.findUnique({
                where: {email: user}
            })

            variant = await prisma.productVariant.findUnique({
                where: {
                    productId_color: {
                        productId: data,
                        color: variant,
                    }
                }
            })

            size = Number(size)

            if(!user) {
                return res.status(404).json({ message: "Usuário não encontrado!" });
            }

            await prisma.cart.upsert({
                where: {
                    userId_productId_variantId_sizeId: {
                        userId: user.id,
                        productId: data,
                        variantId: variant.id,
                        sizeId: size,
                    },
                },
                update: {
                    quantity: quantity
                },
                create : {
                    userId: user.id,
                    productId: data,
                    variantId: variant.id,
                    sizeId: size,
                    quantity: quantity,
                }
            })

            return res.status(200).json({message: `Produto ${size}, ${variant} inserido no carrinho do usuário ${user} `})
        } catch (error) {
            return res.status(400).json({
                message: `produto não pode ser inserido no usuário`,
                error: error instanceof Error ? error.message : String(error)
            })
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    
}