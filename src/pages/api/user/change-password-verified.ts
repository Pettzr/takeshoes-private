import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/src/lib/prisma'; 
import verifyEmail from '@/src/utils/verifyEmail';

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const { token, email } = req.query;

    try{

        if (typeof token !== 'string' || typeof email !== 'string') {
            return res.status(400).json({ error: 'Invalid token or email' });
        }
        
        const emailVerified = await verifyEmail(token, email)

        const account = await prisma.verificationToken.findUnique({
            where: {email: email as string}
        });

        if (emailVerified && account){
            await prisma.verificationToken.delete({
                where: {email: email as string}
            });
        }


        return res.status(201).json({ message: 'Email verificado com sucesso' });
    } catch (error) {
        return res.status(500).json({ error: 'Verification failed', details: (error as Error).message });
    }
}