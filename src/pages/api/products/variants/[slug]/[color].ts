import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/src/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug, color } = req.query;

  if (req.method === 'GET') {
    if (typeof slug === 'string') {
      try {
        const product = await prisma.product.findUnique({
          where: { slug },
          include: {
            variant: {
              include: {
                sizes: true
              },
            },
          },
        });

        if (product) {
          const filteredVariants = color
            ? product.variant.filter(variant => variant.color === color)
            : product.variant;

          res.status(200).json({ ...product, variants: filteredVariants });
        } else {
          res.status(404).json({ error: 'Produto não encontrado' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produto', details: (error as Error).message });
      }
    } else {
      res.status(400).json({ error: 'Slug inválido' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
