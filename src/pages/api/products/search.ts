import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const { q } = req.query;

            // Tratar espaços vazios e valores não fornecidos
            const search = typeof q === 'string' ? q.trim() : '';

            // Consultar produtos
            const products = await prisma.product.findMany({
                where: {
                    name: search
                        ? {
                            contains: search,
                            mode: 'insensitive',
                        }
                        : undefined,
                },
                include: {
                    variant: {
                        select: {
                            images: true,
                            price: true,
                            color: true,
                        }
                    }
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
        