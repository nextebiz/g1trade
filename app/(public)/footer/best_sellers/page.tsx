'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function BestSellers() {
    const [users, setUsers] = useState<User[]>();
    const [limit, setLimit] = useState(10);

    const getBestSellers = async () => {
        const fetch_best = await fetch("/api/public/footer/best_sellers", {
            method: "POST",
            next: { revalidate: 1 }
        })
        const response_best = await fetch_best.json()
        setUsers(response_best.data)
    }
    useEffect(() => {
        getBestSellers();
    }, [])
    return (
        <div>
            <nav className="list-none mb-10">
                {users?.map((user: any, i: number) => {
                    if (i >= limit) {
                        return
                    }
                    return <li key={i} className='mb-2'>
                        {/* <a href={`/?page=1&pid=${user.id}`} className="hover:text-green-500">{user.name}</a> */}
                        <Link
                            onClick={() => {
                                window.scrollTo(0, 0);
                            }}
                            href={`/profile/${user.id}`}>{user.name}</Link>
                    </li>
                })}
            </nav>
        </div>
    )
}
