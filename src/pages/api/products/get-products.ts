import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/src/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { orderBy } = req.query;
      let orderClause = {};
    
      if (orderBy === 'price_asc') {
        orderClause = { price: 'asc' };
      } else if (orderBy === 'price_desc') {
        orderClause = { price: 'desc' };
      } else if (orderBy === 'created_at_desc') {
        orderClause = { createdAt: 'desc' };
      }
    
      const products = await prisma.product.findMany({
        orderBy: orderClause,
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
