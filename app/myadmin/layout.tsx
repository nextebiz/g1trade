import React from 'react'
import AdminMenuLeft from './menu_left/page'
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import GoLogin from '../(public)/go_login/page';

interface Props {
    children: React.ReactNode
}

export default async function LayoutAdmin({ children }: Props) {
    const session = await getServerSession(authOptions);

    return (
        <>
            {session === null || session?.user.role !== "ADMIN" ? <GoLogin /> :
                <div className='flex'>
                    <div>
                        <AdminMenuLeft />
                    </div>
                    <div className='bg-white w-full' style={{ minHeight: "400px" }}>
                        {children}
                    </div>
                </div>
            }
        </>
    )
}

