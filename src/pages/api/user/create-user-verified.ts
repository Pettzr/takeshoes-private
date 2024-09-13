import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/src/lib/prisma'; 
import verifyEmail from '@/src/utils/userVerifyEmail';

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
            if(!account.password){
                return res.status(400).json({ error: 'Password not found' });
            }
            
            await prisma.user.create({
                data: {
                    email: account!.email,
                    password: account!.password,
                }
            });
        }

        try{
            await prisma.verificationToken.delete({
                where: {email: email as string}
            });
        } catch (error){
            console.warn('Verification token deletion failed:', (error as Error).message);
        }

        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Verification failed', details: (error as Error).message });
    }
}