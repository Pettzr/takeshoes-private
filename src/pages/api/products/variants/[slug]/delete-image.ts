import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/src/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    try {
      const { slug } = req.query;
      const { variantId, image } = req.body;

      // Valida os parâmetros da requisição
      if (typeof slug !== 'string' || typeof variantId !== 'number' || typeof image !== 'string') {
        return res.status(400).json({ error: 'Invalid request parameters' });
      }

      // Verifica se o produto existe
      const product = await prisma.product.findUnique({
        where: { slug },
        include: {
          variants: true,
        },
      });

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      // Encontra a variante específica
      const variant = product.variants.find(v => v.id === variantId);

      if (!variant) {
        return res.status(404).json({ error: 'Variant not found' });
      }

      // Verifica se a imagem a ser excluída é a primeira
      if (variant.images[0] === image) {
        return res.status(400).json({ error: 'Cannot delete the first image' });
      }

      // Remove a imagem da lista de imagens da variante
      const updatedVariant = await prisma.productVariant.update({
        where: { id: variantId },
        data: {
          images: {
            set: variant.images.filter(img => img !== image),
          },
        },
      });

      // Aqui você pode adicionar a lógica para remover a imagem do Cloudinary, se necessário

      res.status(200).json({ message: 'Image deleted successfully', variant: updatedVariant });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting image', details: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
