import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {


    const current_date = new Date();
    current_date.setDate(current_date.getDate() - 1);

    const best_products = await prisma.order.groupBy({
        take: 50,
        by: ["productId"],
        _count: {
            productId: true,

        },
        where: {
            product: {
                User: {
                    expiryDate: {
                        gte: current_date
                    }
                }
            }
        },
        orderBy: {
            _count: {
                productId: "desc"
            }
        }
    })

    let result = best_products.map(product => {
        return product.productId
    })

    const users_tmp = await prisma.product.findMany({
        select: {
            User: {
                select: {
                    id: true,
                    name: true
                }
            }
        },
        where: {
            id: {
                in: result
            },
            User: {
                role: "SELLER"
            }
        }
    });

    const best_sellers: any = []

    users_tmp.map(u => {
        const finduser = best_sellers.find((best_user: any) => u.User.id === best_user.id)
        if (finduser === undefined) { 
            best_sellers.push(u.User)
        }

    })

    return NextResponse.json({
        msg: "best sellers",
        data: best_sellers,

    })
}