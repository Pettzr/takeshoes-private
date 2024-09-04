import prisma from "@/src/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        try {
            const { id } = req.body;
            await prisma.product.delete({ where: { id } });
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch(error) {
            console.log(error as Error)
            res.status(500).json({ error: 'Error deleting product', details: (error as Error).message });
        }
    }
}
