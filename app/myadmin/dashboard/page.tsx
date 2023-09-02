'use client'
import React, { useEffect, useState } from 'react'
import { CheckCircleFilled, CheckCircleOutlined, IdcardOutlined, MessageOutlined, ExclamationCircleOutlined, AppstoreAddOutlined, AppstoreOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import Link from 'next/link'
import { getUserFromSession } from '@/utils/getUserFromSession'
import { Spin } from 'antd'
import dayjs from 'dayjs';


export default function AdminDashboard() {

    const [user, setUser] = useState({} as User)
    const [page_loaded, setPageLoaded] = useState(false)

    return (
        <div className='' style={{ width: "100%" }}>
            <div style={{ height: "60px" }} className='bg-slate-700 flex items-center'>

                <div className='text-white ml-10 md:ml-6'>
                    {"Seller's Dashboard"}
                </div>
            </div>
            <div className='text-black'>
                <section>
                    <div className="relative items-center w-full py-6 mx-auto px-4 md:px-6 lg:px-6 ">
                        <div className='text-2xl mb-6'>
                            <div>
                                <span>ADMIN DASHBOARD</span>
                            </div>
                        </div>

                        <div className="grid w-full grid-cols-1 gap-2 mx-auto md:grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

                            <div className="p-6 border rounded-lg shadow shaodw-xl">
                                <div className="inline-flex items-center justify-center  w-12 h-12 mx-auto mb-5 text-blue-600 rounded-full bg-blue-50">
                                    <AppstoreAddOutlined className='text-2xl' />
                                </div>
                                <div className='mb-8'>
                                    <h1 className="mx-auto  text-xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-xl">
                                        Manage Users
                                    </h1>


                                </div>
                                <p className="mx-auto text-base leading-relaxed text-gray-500">
                                    Update/Delete Users more...
                                </p>
                                <div className="mt-4">
                                    <Link href="/myadmin/users" className="inline-flex items-center mt-4 font-semibold text-blue-600 lg:mb-0 hover:text-neutral-600" title="read more">
                                        Manage Users »
                                    </Link>
                                </div>

                            </div>
                            <div className="p-6 border rounded-lg shadow shaodw-xl">
                                <div className="inline-flex items-center justify-center  w-12 h-12 mx-auto mb-5 text-blue-600 rounded-full bg-blue-50">
                                    <AppstoreOutlined className='text-2xl' />
                                </div>
                                <h1 className="mx-auto mb-8 text-xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-xl">
                                    Manage Products
                                </h1>

                                <p className="mx-auto text-base leading-relaxed text-gray-500">
                                    Update/Delete product tile, description, picture, prices, quantities and more...
                                </p>
                                <div className="mt-4">
                                    <Link href="/myadmin/products" className="inline-flex items-center mt-4 font-semibold text-blue-600 lg:mb-0 hover:text-neutral-600" title="read more">
                                        Manage Your Products »
                                    </Link>
                                </div>
                            </div>
                            <div className="p-6 border rounded-lg shadow shaodw-xl">
                                <div className="inline-flex items-center justify-center  w-12 h-12 mx-auto mb-5 text-blue-600 rounded-full bg-blue-50">
                                    <ShoppingCartOutlined className='text-2xl' />
                                </div>
                                <h1 className="mx-auto mb-8 text-xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-xl">
                                    View Orders
                                </h1>

                                <p className="mx-auto text-base leading-relaxed text-gray-500">
                                    View all orders
                                </p>
                                <div className="mt-4">
                                    <Link href="/myadmin/orders" className="inline-flex items-center mt-4 font-semibold text-blue-600 lg:mb-0 hover:text-neutral-600" title="read more">
                                        View Your Orders »
                                    </Link>
                                </div>
                            </div>

                            <div className="p-6 border rounded-lg shadow shaodw-xl">
                                <div className="inline-flex items-center justify-center  w-12 h-12 mx-auto mb-5 text-blue-600 rounded-full bg-blue-50">
                                    <IdcardOutlined className='text-2xl' />
                                </div>
                                <h1 className="mx-auto mb-8 text-xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-xl">
                                    Website Settings
                                </h1>

                                <p className="mx-auto text-base leading-relaxed text-gray-500">
                                    Manage social logins and youtube videos
                                </p>
                                <div className="mt-4">
                                    <Link href="/myadmin/website_settings" className="inline-flex items-center mt-4 font-semibold text-blue-600 lg:mb-0 hover:text-neutral-600" title="read more">
                                        Go To Website Settings »
                                    </Link>
                                </div>
                            </div>

                            {/* <div className="p-6 border rounded-lg shadow shaodw-xl">
                                <div className="inline-flex items-center justify-center  w-12 h-12 mx-auto mb-5 text-blue-600 rounded-full bg-blue-50">
                                    <MessageOutlined className='text-2xl' />
                                </div>
                                <h1 className="mx-auto mb-8 text-xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-xl">
                                    Messages
                                </h1>

                                <p className="mx-auto text-base leading-relaxed text-gray-500">
                                    Read and reply messages from your buyers. Keep al track of all the conversation.
                                </p>
                                <div className="mt-4">
                                    <Link href="/seller/messages" className="inline-flex items-center mt-4 font-semibold text-blue-600 lg:mb-0 hover:text-neutral-600" title="read more">
                                        Go To Buyers Messages » </Link>
                                </div>
                            </div> */}

                        </div>
                    </div>
                </section>

            </div>

        </div>
    )
}
