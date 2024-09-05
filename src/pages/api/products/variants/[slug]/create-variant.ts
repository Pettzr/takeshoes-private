// pages/api/products/[slug]/add-color.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/src/lib/prisma'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    try {
      const { slug } = req.query;
      const { color, images, sizes, price } = req.body;

      if (typeof slug !== 'string') {
        return res.status(400).json({ error: 'Invalid slug' });
      }

      // Find the product by slug
      const product = await prisma.product.findUnique({
        where: { slug },
        include: { variant: true },
      });

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      // Update the product with a new variant
      const updatedProduct = await prisma.product.update({
        where: { slug },
        data: {
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
        include: { variant: true },
      });

      res.status(200).json({ product: updatedProduct, message: 'Color variant added successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Error adding color variant', details: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['PATCH']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
