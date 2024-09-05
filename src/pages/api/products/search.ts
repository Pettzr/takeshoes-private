import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { name } = req.body;

            // Tratar espaços vazios e valores não fornecidos
            const searchName = typeof name === 'string' ? name.trim() : '';

            // Consultar produtos
            const products = await prisma.product.findMany({
                where: {
                    name: searchName
                        ? {
                            contains: searchName,
                            mode: 'insensitive',
                        }
                        : undefined,
                },
                include: {
                    variant: {
                        select: {
                            images: true,
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
        