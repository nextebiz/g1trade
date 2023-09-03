import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {

    const current_date = new Date();
    current_date.setDate(current_date.getDate() - 1);

    const [categories, provinces] = await prisma.$transaction([
        prisma.category.findMany({
            where: {
                enabled: true
            }
        }),
        prisma.province.findMany({
            select: {
                id: true,
                name: true,
                city: {
                    select: {
                        id: true,
                        name: true,
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
                    },
                    where: {
                        enabled: true
                    }
                },
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
                },

            },
            where: {
                enabled: true
            },


        })
    ])
    await prisma.$disconnect();


    return NextResponse.json({
        msg: "cats",
        data: {
            categories: categories,
            provinces: provinces
        }
    })
}