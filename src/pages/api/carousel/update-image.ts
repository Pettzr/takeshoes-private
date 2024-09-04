import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/src/lib/prisma'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    if (req.method === 'PATCH') {
        try {
            const {image} = req.body 

            const carouselItem = await prisma.carousel.findFirst();

            if (!carouselItem) {
                return res.status(404).json({ message: 'Carousel item not found' });
            }

            await prisma.carousel.update({
                where: { id: carouselItem.id },
                data: { image: image },
            });

            res.status(200).json({ message: 'Image updated successfully' });
        } catch (error) {
            console.error('Error fetching images:', error);
            res.status(500).json({ error: 'An error occurred while fetching images' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}