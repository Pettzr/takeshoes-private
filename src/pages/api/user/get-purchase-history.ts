import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/src/lib/prisma";


export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'GET') {
        const session = await getServerSession(req, res, authOptions)
        const email = session?.user.email

        if(!email) {
            return res.status(404).json({message: 'Email not found!'})
        }

        const user = await prisma.user.findUnique({
            where:{
                email: email
            }
        })

        if(!user) {
            return res.status(404).json({message: 'User not found!'})
        }

        const items = await prisma.purchaseHistory.findMany({
            where:{
                userId: user.id
            }
        })

        const purchaseIds = items.flatMap(item => item.purchaseIds);
        
        const purchaseHistory = await prisma.purchase.findMany({
          where: {
            id: {
              in: purchaseIds,
            },
          },
            include: {
                product: {         
                    include: {
                        variant: {
                            select: {
                                images: true
                            },
                        },
                    },
            },  variant: {
                    select: {
                        images: true,
                        color: true,
                        price: true,
                    }
            }, size: {
                select: {
                    size: true,
                    quantity: true,  
                }
            }
        }
    });
  
        return res.status(200).json(purchaseHistory);

    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}