import React from 'react'
import SellerMenuLeft from './menu_left/page'
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import GoLogin from '../(public)/go_login/page';

interface Props {
    children: React.ReactNode
}

export default async function LayoutSeller({ children }: Props) {
    const session = await getServerSession(authOptions);

    return (
        <>
            {session === null || session?.user.role !== "SELLER" ? <GoLogin /> :

                <div className='flex'>
                    <div>
                        <SellerMenuLeft />
                    </div>
                    <div className='bg-white w-full' style={{ minHeight: "400px" }}>
                        {children}
                    </div>
                </div>
            }
        </>
    )
}
