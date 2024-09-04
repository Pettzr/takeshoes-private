import crypto from 'crypto';
import nodemailer from 'nodemailer';
import {addMinutes} from 'date-fns';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/src/lib/prisma'; 
import { hashContent } from '@/src/utils/userHash';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try { 
            let { email } = req.body;
            let token = crypto.randomBytes(32).toString('hex');
            const expiresAt =  addMinutes(new Date(), 20);

            const verificationUrl = `/verified-change-password?token=${token}&email=${email}`

            token = await hashContent(token)

            await prisma.verificationToken.create({
                data: {
                    email,
                    token,
                    expiresAt,
                }
            })

            const transporter = nodemailer.createTransport({
                host: 'in-v3.mailjet.com',
                port: 587,
                auth: {
                    user: process.env.MAILJET_API_KEY,
                    pass: process.env.MAILJET_API_SECRET,
                }
            })

            await transporter.sendMail({
                from: 'sevenoutfit2024@gmail.com',
                to: email,
                subject: 'Verify your email.',
                text: `Please click the following link to verify your email: ${verificationUrl}`,
                html: `<p>Please click the following link to verify your email:</p><a href="${verificationUrl}">${verificationUrl}</a>`,
            })

            return res.status(200).json({ message: 'Verification email sent' });
        } catch (error) {
            return res.status(500).json({error: "Erro ao criar usuário", details: (error as Error).message })
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}