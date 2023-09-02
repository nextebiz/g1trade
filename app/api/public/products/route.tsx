import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import dayjs from "dayjs";

export async function POST(req: Request, res: Response) {

    const current_date = new Date();
    current_date.setDate(current_date.getDate() - 1);

    const form_data = await req.formData();
    const buyer_id = form_data.get("buyer_id") as string;
    let category_id = form_data.get("category_id") as string;
    let province_id = form_data.get("province_id") as string
    let city_id = form_data.get("city_id") as string
    let take = parseInt(form_data.get("take") as string)
    let skip = parseInt(form_data.get("skip") as string)
    let order_by = form_data.get("order_by") as string; // orders, latest

    if (order_by === null) {
        order_by = "latest"
    }
    console.log(order_by)


    let citySearch = {}
    let categorySearch = {}
    let some_obj = {}

    if (category_id !== "undefined") {
        categorySearch = {
            id: category_id
        }
    }

    if (province_id !== "undefined") {
        some_obj = {
            provinceId: province_id,
        }
    }

    if (province_id !== "undefined" && city_id !== "undefined") {
        some_obj = {
            provinceId: province_id,
            cityId: city_id
        }
    }

    if (province_id !== "undefined") {
        citySearch = {
            some: some_obj
        }
    }

    const query: Prisma.ProductFindManyArgs = {
        take: take,
        skip: skip,
        where: {
            enabled: true,
            status: "APPROVED",
            productCity: citySearch,
            Category: categorySearch,
            User: {
                expiryDate: {
                    gte: current_date
                }
            }
        },
        include: {
            _count: true,
            images: true,
            Category: true,
            User: true,
            rating: {
                select: {
                    stars: true
                }
            },
            productCity: {
                include: {
                    City: true
                }
            },
            ProductLikes: {
                where: {
                    userId: buyer_id
                }
            }
        }
        // ,
        // orderBy:
        // {
        //     createdAt: "desc",
        //     Order: {_count: "desc"}
        // } 
    }

    if (order_by === "latest") {
        query.orderBy = {
            createdAt: "desc",
        }
    }
    if (order_by === "orders") {
        query.orderBy = {
            Order: { _count: "desc" }
        }
    }
    const [products, count] = await prisma.$transaction([
        prisma.product.findMany(query),
        prisma.product.count({ where: query.where })
    ])
    await prisma.$disconnect()

    return NextResponse.json({
        msg: "products",
        data: products,
        stats: {
            count: count,
            take: take,
            skip: skip,
        }
    })
}