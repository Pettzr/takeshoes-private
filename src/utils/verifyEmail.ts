import prisma from '@/src/lib/prisma'; 
import { verifyHash } from '@/src/utils/userHash';

export default async function verifyEmail (token: string, email: string) {
    try{
        const verificationRecord = await prisma.verificationToken.findUnique({
            where: {email: email as string}
        });

        if(!verificationRecord) {
            console.error('Verification token not found:', token);
            return false
        }

        
        if (new Date() > verificationRecord.expiresAt) {
            console.error('Token expired:', token, 'Expiry:', verificationRecord.expiresAt, 'Current:', new Date());
            await prisma.verificationToken.delete({
                where: {email: email as string}
            });
            return false
        }

        const isTokenValid = await verifyHash(token, verificationRecord.token);

        if (!isTokenValid) {
            console.error('Token verification failed for email:', email);
            return false
        }

        return true
    } catch (error) {
        return false
    }
}