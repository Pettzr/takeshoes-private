// pages/api/create-product.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/src/lib/prisma'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, color, images, sizes, price } = req.body;

      const slug = name.replace(/[^\w]/g, '-').toLowerCase();

      const product = await prisma.product.create({
        data: {
          name,
          slug,
          variant: {
            create: [{
              color,
              price,
              images,
              sizes: {
                create: sizes.map((size: any) => ({
                  size: size.size,
                  quantity: size.quantity
                })),
              },
          }],
        },
        },
      });
      res.status(201).json({product, 'mensagem': 'Produto criado com sucesso!'});
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar o produto', details: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
