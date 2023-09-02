'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { RightCircleOutlined, LeftCircleOutlined, FundProjectionScreenOutlined, IdcardOutlined, PlusCircleOutlined, ProfileOutlined, AppstoreAddOutlined, AppstoreOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { getUserFromSession } from '@/utils/getUserFromSession'
import { usePathname } from 'next/navigation'

interface Props {
  params: {
    showLeftPanel: boolean,
    openLeftPanel: any,
    onClose: any,
    closeLeftPanel: () => void
  }
}

export default function LeftPanel({ params: { showLeftPanel, openLeftPanel, onClose, closeLeftPanel } }: Props) {
  const [showText, setShowText] = useState(true)
  const [show_order_count, setShowOrderCount] = useState(true)
  const [order_count, setOrderCount] = useState(0)
  const pathname = usePathname();

  const getOrderCount = async () => {

    const get_user_from_session: any = await getUserFromSession();
    if (get_user_from_session?.id !== undefined) {

      const form_data = new FormData();
      form_data.set("user_id", get_user_from_session?.id);
      const fetch_count = await fetch("/api/seller/orders/count", {
        method: "POST",
        body: form_data,
        next: { revalidate: 300 }
      })
      const response_count = await fetch_count.json();
      setOrderCount(response_count.data.count)
    }
  }

  useEffect(() => {

    getOrderCount()
    let myinterval: any = null;
    if (!showLeftPanel) {
      clearInterval(myinterval)
      setShowText(showLeftPanel)
    }
    if (showLeftPanel) {
      myinterval = setTimeout(() => {
        setShowText(true)
        clearInterval(myinterval)
      }, 50)
    }
  }, [showLeftPanel])
  return (
    <div className='text-md left-panel overflow-hidden'>
      <div

        onClick={() => {
          showLeftPanel ? closeLeftPanel() : openLeftPanel();
        }}
        className='hidden md:flex cursor-pointer bg-slate-900 hover:bg-green-700  left-panel-heeader w-full justify-start items-center text-lg transition-all'
        style={{ height: "60px" }}
      >
        <div className='flex pl-3 items-center'>
          <div className='text-2xl'>
            {showLeftPanel ? <LeftCircleOutlined /> :
              <RightCircleOutlined />
            }
          </div>
          <div className={`ml-2  whitespace-nowrap ${showLeftPanel ? "" : "hidden"}`}>
            {"Seller's Panel"}
          </div>
        </div>
      </div>
      <Link onClick={() => { onClose() }} href={"/seller/"}>
        <div className={`pl-3 py-3 hover:bg-slate-700 transition-all flex  items-center hover:text-green-300 ${pathname === "/seller" ? "text-green-400" : ""}`}>
          <div className='mt-1 mr-2 text-2xl '>
            <FundProjectionScreenOutlined />
          </div>
          <div className='transition-all whitespace-nowrap ' style={{ opacity: showText ? 1 : 0 }} >
            {showText ? "Seller's Dashboard" : <span className='opacity-0'>_</span>}
          </div>
        </div>
      </Link>

      <Link onClick={() => { onClose() }} href={"/seller/add_product"}>
        <div className={`pl-3 py-3 hover:bg-slate-700 transition-all flex  items-center hover:text-green-300 ${pathname.startsWith("/seller/add_product") ? "text-green-400" : ""}`}>
          <div className='mt-1 mr-2 text-2xl'>
            <PlusCircleOutlined />
          </div>
          <div className='transition-all whitespace-nowrap ' style={{ opacity: showText ? 1 : 0 }} >
            {showText ? "Upload New Product" : <span className='opacity-0'>_</span>}
          </div>
        </div>
      </Link>
      <Link onClick={() => { onClose() }} href={"/seller/manage_products"}>
        <div className={`pl-3 py-3 hover:bg-slate-700 transition-all flex  items-center hover:text-green-300 ${pathname.startsWith("/seller/manage_products") ? "text-green-400" : ""}`}>

          <div className='mt-1 mr-2 text-2xl'>
            <AppstoreOutlined />
          </div>
          <div className='transition-all whitespace-nowrap' style={{ opacity: showText ? 1 : 0 }} >
            {showText ? "Manage Products" : <span className='opacity-0'>_</span>}
          </div>
        </div>
      </Link>
      <Link onClick={() => { onClose() }} href={"/seller/orders"}>
        <div className={`pl-3 py-3 hover:bg-slate-700 transition-all flex  items-center hover:text-green-300 ${pathname.startsWith("/seller/orders") ? "text-green-400" : ""}`}>

          <div className='mt-1 mr-2 text-2xl'>
            <ShoppingCartOutlined />
          </div>
          <div onClick={() => { setShowOrderCount(false) }} className='transition-all whitespace-nowrap' style={{ opacity: showText ? 1 : 0 }} >
            {showText ? <div className='flex'>
              <span>Orders</span>
              {show_order_count ?
                order_count > 0 ? <div className='bg-green-700 flex items-center justify-center rounded-full text-xs ml-2'
                  style={{ width: "20px", height: "20px" }}>{order_count}</div> : ""
                : ""}
            </div> : <span className='opacity-0'>_</span>}
          </div>
        </div>
      </Link>
      {/* <Link onClick={() => { onClose() }}  href={"/seller/messages"}>
        <div className='flex items-center hover:text-green-300'>

          <MessageOutlined className='mt-1 text-2xl' style={{ marginRight: "10px" }} />
          <div className='transition-all whitespace-nowrap' style={{ opacity: showText ? 1 : 0 }} >
            {showText ? "Messages" : <span className='opacity-0'>_</span>}
          </div>
        </div>
      </Link> */}
      <Link onClick={() => { onClose() }}
        href={"/seller/profile"}>
        <div className={`pl-3 py-3 hover:bg-slate-700 transition-all flex items-center hover:text-green-300 ${pathname.startsWith("/seller/profile") ? "text-green-400" : ""}`}>

          <IdcardOutlined className='mt-1 text-2xl' style={{ marginRight: "10px" }} />
          <div className='transition-all whitespace-nowrap' style={{ opacity: showText ? 1 : 0 }} >
            {showText ? "Seller's Profile" : <span className='opacity-0'>_</span>}
          </div>
        </div>
      </Link>

    </div>
  )
}