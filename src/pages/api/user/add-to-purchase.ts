import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/src/lib/prisma'; 

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        let {user, data} = req.body

        try {
            const foundUser = await prisma.user.findUnique({
              where: { email: user },
            });
      
            if (!foundUser) {
              return res.status(404).json({ message: "Usuário não encontrado!" });
            }
      
            const purchaseIds: number[] = [];
      
            await Promise.all(
              data.map(async (item: any) => {

                const variant = await prisma.productVariant.findUnique({
                  where: {
                    productId_color: {
                      productId: item.product.id,
                      color: item.variant.color,
                    },
                  },
                });
      
                if (!variant) {
                  throw new Error(`Variant não encontrada para o produto ${item.product.id} e cor ${item.variant.color}`);
                }
      
                const size = Number(item.sizeId);
                const quantity = item.quantity;
      
                const newPurchase = await prisma.purchase.create({
                  data: {
                    userId: foundUser.id,
                    productId: item.product.id,
                    variantId: variant.id,
                    sizeId: size,
                    quantity: quantity,
                  },
                });
      
                purchaseIds.push(newPurchase.id);
              })
            );
      
            await prisma.purchaseHistory.create({
              data: {
                purchaseIds: purchaseIds,
                userId: foundUser.id,
              },
            });
      
            return res.status(200).json({ message: `Pedido de compra feito com sucesso para o usuário ${user}` });
          } catch (error) {
            return res.status(400).json({
              message: `Pedido de compra não pode ser feito.`,
              error: error instanceof Error ? error.message : String(error),
            });
          }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    
}