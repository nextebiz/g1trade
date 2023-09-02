import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {

    const current_date = new Date();
    current_date.setDate(current_date.getDate() -1);

    const provinces = await prisma.province.findMany({
        where: {
            
        },
        include: {
            city: {
                where: {
                    enabled: true,
                },
                orderBy: {
                    name: "asc"
                },
                include: {
                    _count: {
                        select: {
                            product: {
                                where: {
                                    Product: {
                                        enabled: true,
                                        status: "APPROVED",
                                        User: {
                                            expiryDate: {
                                                gte: current_date
                                            }
                                        }
                                
                                    }
                                }
                            }
                        }
                    }
                }
            }

            , _count: {
                select: {
                    product: {
                        where: {
                            Product: {
                                enabled: true,
                                status: "APPROVED",
                                User: {
                                    expiryDate: {
                                        gte: current_date
                                    }
                                }
                            }
                        }
                    }
                }
            },
        },
        orderBy: {
            name: "asc"
        }
    })
    await prisma.$disconnect()

    return NextResponse.json({
        msg: "provinces with cities",
        data: provinces
    })
}