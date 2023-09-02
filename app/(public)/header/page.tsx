'use client'
import React, { useEffect, useState } from 'react'
import { RightOutlined, LoginOutlined, DownOutlined, ShoppingCartOutlined, MessageOutlined, DatabaseOutlined, LogoutOutlined, WhatsAppOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Button, Drawer, message, Dropdown, Space, ConfigProvider } from 'antd';
import "@/app/styles.scss"
import { useSearchParams, usePathname } from 'next/navigation';
import { NoticeType } from 'antd/es/message/interface';

import { setSelectedCategory, setSelectedCity, setSelectedProvince, setSkip } from "../../GlobalRedux/Features/search"

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';

interface Props {
    params: {
        session: any
    }
}
export default function HeaderPublic({ params: { session } }: Props) {

    // const [session, setSession] = useState<any>();

    const query_string = useSearchParams()
    const [open, setOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const pathname = usePathname();
    const [items, setItems] = useState<MenuProps['items']>([])
    const [selected_menu, setSelectedMenu] = useState("")

    const search_result = useSelector((state: RootState) => state.searchReducer.search_result)
    const dispatch = useDispatch();

    const showMessage = (type: string, msg: string) => {
        let mytype = type! as NoticeType;
        messageApi.open({
            type: mytype,
            content: msg,
        });
    };

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const buyer_items = [
        {
            key: '1',
            label: (
                <Link href="/buyer/account">
                    Logged in as {session?.user?.name}
                    <br />
                    <strong className='font-bold'>Email: </strong>{session?.user?.email}
                    <br />
                    <div className='text-xs'><strong className='font-bold'>ID:</strong> {session?.user?.id}</div>

                </Link>
            ),
        },
        {
            key: '3',
            label: (
                <div>
                    <Link className='' href="/buyer/">
                        <div className='flex text-slate-800 py-1'>
                            <DatabaseOutlined /> <span className='ml-2'>{"My Buyer Account"}</span>
                        </div>
                    </Link>
                </div>
            ),
        },
        {
            key: '4',
            label: (
                <div className=' py-1 '>
                    <Link className='' href="/buyer/orders">
                        <div className='flex text-slate-800 py-1'>
                            <ShoppingCartOutlined /> <span className='ml-2'>My Orders</span>
                        </div>
                    </Link>
                </div>
            ),
        },
        {
            key: '6',
            label: (<div className=' py-1 '>
                <Link className='' href="/signin/verify_info">
                    <div className='flex text-slate-800 py-1'>
                        <WhatsAppOutlined /> <span className='ml-2'>My Contact Info</span>
                    </div>
                </Link>
            </div>
            ),
        },
        {
            key: '7',
            label: (
                <div className=' py-1 '>
                    <Link onClick={() => { signOut({ callbackUrl: '/' }) }} className='' href="#">
                        <div className='flex text-slate-800 py-1'>
                            <LogoutOutlined /> <span className='ml-2'>Sign Out</span>
                        </div>
                    </Link>
                </div>

            ),
        },
    ]

    const seller_items = [
        {
            key: '1',
            label: (
                <Link href="/buyer/account">
                    Logged in as {session?.user?.name}
                    <br />
                    <strong className='font-bold'>Email: </strong>{session?.user?.email}
                    <br />
                    <div className='text-xs'><strong className='font-bold'>ID:</strong> {session?.user?.id}</div>

                </Link>
            ),
        },

        {
            key: '2x',
            label: (
                <div className=' py-1 '>
                    <Link className='' href="/seller">
                        <div className='flex text-slate-800 py-1'>
                            <LoginOutlined /> <span className='ml-2'>{"My Seller Account"}</span>
                        </div>
                    </Link>
                </div>
            ),
        },
        {
            key: '3',
            label: (
                <div>
                    <Link className='' href="/buyer/">
                        <div className='flex text-slate-800 py-1'>
                            <DatabaseOutlined /> <span className='ml-2'>{"My Buyer Account"}</span>
                        </div>
                    </Link>
                </div>
            ),
        },
        {
            key: '7',
            label: (
                <div className=' py-1 '>
                    <Link onClick={() => { signOut({ callbackUrl: '/' }) }} className='' href="#">
                        <div className='flex text-slate-800 py-1'>
                            <LogoutOutlined /> <span className='ml-2'>Sign Out</span>
                        </div>
                    </Link>
                </div>

            ),
        }
    ]
    const admin_items = [

        {
            key: '7',
            label: (
                <div>
                    <Link onClick={() => { signOut({ callbackUrl: '/' }) }} className='' href="#">
                        <div className='flex text-slate-800 py-1'>
                            <LogoutOutlined /> <span className='ml-2'>Sign Out</span>
                        </div>
                    </Link>
                </div>

            ),
        }
    ]

    const setMenu = () => {
        if (session?.user.role === "BUYER") {
            setItems(buyer_items)

        }
        if (session?.user.role === "SELLER") {
            setItems(seller_items)
        }
        if (session?.user.role === "ADMIN") {
            setItems(admin_items)
        }
    }

    useEffect(() => {
        setMenu()
        const msg = query_string.get("msg")
        const user_types = ["admin", "buyer", "seller"]
        const find_msg = user_types.find(item => msg === item)
        if (find_msg !== undefined) {
            showMessage("success", `You have successfully logged in as ${find_msg}`);
        }

    }, [])

    return (

        <div>
            {contextHolder}

            <ConfigProvider
                theme={{
                    token: {
                        colorBgBase: "#1e293b",
                        colorText: "#ffffff",
                        colorLink: "#ffffff",
                        colorIcon: "FF00FF",
                    },
                }}
            >
                <Drawer
                    title="Close Menu"
                    placement="right"
                    width={300}
                    onClose={onClose}
                    open={open}
                >

                    <div className='text-lg'>
                        <div className='mb-4'>
                            <Link onClick={() => {
                                onClose()
                            }} className="hover:text-gray-200" href="/">
                                <div className='flex items-center'>
                                    <div className='text-sm mr-3'>
                                        <RightOutlined />
                                    </div>
                                    <div>
                                        G1 Garlic For Sale
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className='mb-4'>
                            <Link onClick={() => {
                                onClose()
                            }} className="hover:text-gray-200" href="/cities">
                                <div className='flex items-center'>
                                    <div className='text-sm mr-3'>
                                        <RightOutlined />
                                    </div>
                                    <div>
                                        Browse Cities
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className='mb-4'>
                            <Link onClick={() => {
                                onClose()
                            }} className="hover:text-gray-200" href={
                                session?.user.role === "SELLER" ?
                                    "/seller"
                                    : "/packages"
                            }>
                                <div className='flex items-center'>
                                    <div className='text-sm mr-3'>
                                        <RightOutlined />
                                    </div>
                                    <div>
                                        Start Selling
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className='mb-4'>
                            <Link onClick={() => {
                                onClose()
                            }} className="hover:text-gray-200" href={"/contact"}>
                                <div className='flex items-center'>
                                    <div className='text-sm mr-3'>
                                        <RightOutlined />
                                    </div>
                                    <div>
                                        Contact Us
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </Drawer>
            </ConfigProvider>


            <div className="flex flex-wrap ">
                <section className="relative mx-auto">
                    <nav className="flex justify-start items-center bg-gray-900 text-white w-screen">
                        <div className="px-5 xl:px-12 py-6 flex w-full items-center justify-between">

                            <Link
                                onClick={() => {
                                    if (search_result.length === 0) {
                                        dispatch(setSkip(0))
                                        dispatch(setSelectedCategory({} as Category))
                                        dispatch(setSelectedProvince({} as Province))
                                        dispatch(setSelectedCity({} as City))
                                    }
                                }}
                                className="text-3xl font-bold font-heading w-24 sm:w-32 md:w-40" href={pathname === "/" ? "/" : "/"}>
                                <img src='/images/logo/g1trade-logo-g1-garlic-sale-pakistan.svg?v-1' style={{ width: "150px" }} alt="" />
                            </Link>
                            <ul className="text-sm md:text-md lg:text-md flex px-2 md:px-4 mx-auto font-semibold font-heading space-x-3 lg:space-x-5">
                                <li className=' hidden md:block '>
                                    <Link onClick={() => {
                                        setSelectedMenu("HOME");
                                        if (search_result.length === 0) {
                                            dispatch(setSkip(0))
                                            dispatch(setSelectedCategory({} as Category))
                                            dispatch(setSelectedProvince({} as Province))
                                            dispatch(setSelectedCity({} as City))
                                        }
                                    }} className="hover:text-gray-200" href={pathname === "/" ? "/" : "/"}>
                                        <span className={`${pathname === "/" || pathname.startsWith("/product/") ? "bg-green-700" : ""} border-slate-700 border p-3 rounded-lg  whitespace-nowrap hover:bg-green-600 transition-all`}>
                                            G1 Garlic For Sale
                                        </span>
                                    </Link></li>
                                <li className='hidden sm:block'>
                                    <Link onClick={() => { setSelectedMenu("CITIES") }} className="hover:text-gray-200" href={`/cities`}>
                                        <span className={`${pathname.startsWith("/cities") ? "bg-green-700" : ""} border p-3 rounded-lg border-slate-700 whitespace-nowrap hover:bg-green-600 transition-all`}>
                                            Browse Cities
                                        </span>
                                    </Link></li>
                                <li>
                                    <Link onClick={() => { setSelectedMenu("SELLER") }} className="hover:text-gray-200" href={
                                        session?.user.role === "SELLER" ?
                                            "/seller"
                                            : "/packages"
                                    }>
                                        <span className={`${pathname.startsWith("/seller") ? "bg-green-700" : ""} border p-3 rounded-lg border-slate-700 whitespace-nowrap hover:bg-green-600 transition-all`}>
                                            Start Selling
                                        </span>

                                    </Link></li>
                            </ul>
                            <div className=" flex justify-end items-end space-x-5 ">
                                {session?.user ?
                                    <div className='flex items-center'>
                                        <div className='mr-2 text-xs  text-right hidden md:block'>{session?.user.name}</div>
                                        <Dropdown menu={{ items }}>
                                            <div>
                                                <a onClick={(e) => e.preventDefault()}
                                                    className="flex items-center hover:text-gray-200"
                                                    href="#">
                                                    <Space>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <DownOutlined />
                                                    </Space>
                                                </a>
                                            </div>
                                        </Dropdown>
                                    </div>
                                    :
                                    ""
                                }
                                {session?.user ?
                                    "" :
                                    <div className=' mr-0 md:mr-0' >
                                        <Link onClick={() => {
                                            sessionStorage.setItem("signin_url", pathname)

                                        }} href={"/signin"}>
                                            <div className='  flex flex-row justify-center items-center' >
                                                <div className='p-1 whitespace-nowrap'>Sign in</div>
                                                <svg style={{ color: 'white' }} xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16"> <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" fill="white" /> <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" fill="white" /> </svg>
                                            </div>
                                        </Link>
                                    </div>
                                }
                                <a onClick={() => { showDrawer() }} className="navbar-burger self-center mr-2 sm:mr-12 md:hidden" href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </nav>
                </section>
            </div>
        </div >
    )
}
