import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/src/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const products = await prisma.product.findMany({
        include: {
          variant: {
            select: {
              images: true,
              color: true,
              price: true,
            },
          },
        },
      });

      if (products.length > 0) {
        res.status(200).json(products);
      } else {
        res.status(404).json({ error: 'Nenhum produto encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar produtos', details: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
