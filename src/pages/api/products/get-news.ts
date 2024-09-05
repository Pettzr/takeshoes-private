import prisma from "@/src/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const products = await prisma.product.findMany({
      include: {
        variant: {
          select: {
            images: true, 
            price: true,
            sizes: {
              orderBy: {
                createdAt : 'asc',
              }
            }
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 4,
    });

    const addedNames = new Set<string>();
    
    const imagesWithNames = products.flatMap(product =>
      product.variant
        .map(variant => ({
          image: variant.images,
          name: product.name,
          price: variant.price,
          slug: product.slug,
        }))
        .filter(item => {
          if (addedNames.has(item.name)) {
            return false;
          }
          addedNames.add(item.name);
          return true;
        })
    );

    res.status(200).json(imagesWithNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
}
