import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/src/lib/prisma'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const carousels = await prisma.carousel.findMany({
                select: {
                    image: true,
                },
            });

            const images = carousels.flatMap(carousel => carousel.image);

            res.status(200).json({ images });
        } catch (error) {
            console.error('Error fetching images:', error);
            res.status(500).json({ error: 'An error occurred while fetching images' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}