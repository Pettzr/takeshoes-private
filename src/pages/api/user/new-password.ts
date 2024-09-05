import prisma from "@/src/lib/prisma";
import checkPassword from "@/src/utils/checkPassword";
import { hashContent } from "@/src/utils/userHash";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    let {email, password} = req.body

    const passwordRequirements = checkPassword(password)

    if (passwordRequirements === false) {
        return res.status(400).json({ message: 'Requisitos de Senha não preechidos' });
    }    

    password = await hashContent(password)

    try{
        await prisma.user.update({
            where: {email: email as string},
            data: {password: password},
        });

        return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update password', details: (error as Error).message });
    }
}