import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    const current_date = new Date();
    current_date.setDate(current_date.getDate() -1);
    const top_cities = await prisma.city.findMany({
        select: {
            id: true,
            provinceId: true,
            name: true,
            _count: {
                select: {
                    product: {

                    }
                }
            },
        },
        take: 20,
        orderBy: {
            product: {
                _count: "desc"
            }
        },
        where: {
            product: {
                some: {
                    Product: {
                        User: {
                            expiryDate: {
                                gte: current_date
                            }
                        }
                    }
                }
            }
        }
    })
    return NextResponse.json({
        msg: "top cities",
        data: top_cities
    })
}