'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FundProjectionScreenOutlined, LeftCircleOutlined, RightCircleOutlined, IdcardOutlined, LoginOutlined, ApartmentOutlined, MessageOutlined, ProfileOutlined, AppstoreAddOutlined, AppstoreOutlined, ShoppingCartOutlined } from "@ant-design/icons"
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

export default function BuyerLeftPanel({ params: { showLeftPanel, openLeftPanel, onClose, closeLeftPanel } }: Props) {
  const [showText, setShowText] = useState(true)
  const [user, setUser] = useState({} as User)

  const pathname = usePathname();
  console.log(pathname)

  useEffect(() => {

    const get_session = async () => {
      const get_user_from_session = await getUserFromSession();
      setUser(get_user_from_session)
    }
    get_session()

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
      <div onClick={() => {
        showLeftPanel ? closeLeftPanel() : openLeftPanel();
      }}
        className='hidden md:flex cursor-pointer bg-slate-900 hover:bg-green-700  left-panel-heeader w-full justify-start items-center text-lg transition-all'
        style={{ height: "60px" }}
      >
        <div className='flex pl-4'>
          <div>
            {showLeftPanel ? <LeftCircleOutlined /> :
              <RightCircleOutlined />
            }

          </div>
          <div className={`ml-2 whitespace-nowrap ${showLeftPanel ? "" : "hidden"}`}>
            {"Seller's Panel"}
          </div>
        </div>
      </div>
      <Link
        onClick={() => { onClose() }}
        href={"/buyer/"}>
        <div className={`pl-3 py-3 hover:bg-slate-700 transition-all flex items-center hover:text-green-300 ${pathname === "/buyer" ? "text-green-400" : ""}`}>

          <FundProjectionScreenOutlined className='mt-1 text-2xl' style={{ marginRight: "10px" }} />
          <div className='transition-all whitespace-nowrap ' style={{ opacity: showText ? 1 : 0 }} >
            {showText ? "Buyer Dashboard" : <span className='opacity-0'>_</span>}
          </div>
        </div>
      </Link>
      <Link
        onClick={() => { onClose() }}
        href={"/buyer/orders"}
      >
        <div className={`pl-3 py-3 hover:bg-slate-700 transition-all flex items-center hover:text-green-300 ${pathname.startsWith("/buyer/orders") ? "text-green-400" : ""}`}>

          <ShoppingCartOutlined className='mt-1 text-2xl' style={{ marginRight: "10px" }} />
          <div className='transition-all whitespace-nowrap' style={{ opacity: showText ? 1 : 0 }} >
            {showText ? "My Orders" : <span className='opacity-0'>_</span>}
          </div>
        </div>
      </Link>

      <Link
        onClick={() => { onClose() }}
        href={"/buyer/profile"}
      >
        <div className={`pl-3 py-3 hover:bg-slate-700 transition-all flex items-center hover:text-green-300 ${pathname.startsWith("/buyer/profile") ? "text-green-400" : ""}`}>

          <IdcardOutlined className='mt-1 text-2xl' style={{ marginRight: "10px" }} />
          <div className='transition-all whitespace-nowrap' style={{ opacity: showText ? 1 : 0 }} >
            {showText ? "My Contact Info" : <span className='opacity-0'>_</span>}
          </div>
        </div>
      </Link>

      {/* {user?.role === "SELLER" ?
        <Link className='pl-3 pt-3 pb-3 flex w-full items-center ' href={"/seller/"}>
          <div className='flex items-center hover:text-green-300'>
            <LoginOutlined className='mt-1 text-2xl' style={{ marginRight: "10px" }} />
            <div className='transition-all whitespace-nowrap ' style={{ opacity: showText ? 1 : 0 }} >
              {showText ? "Seller's Dashboard" : <span className='opacity-0'>_</span>}
            </div>
          </div>
        </Link>
        : ""} */}
      {/* <Link className='pl-3 pt-3 pb-3 flex w-full items-center' href={"/buyer/messages"}>
        <div className='flex items-center hover:text-green-300'>

          <MessageOutlined className='mt-1 text-2xl' style={{ marginRight: "10px" }} />
          <div className='transition-all whitespace-nowrap' style={{ opacity: showText ? 1 : 0 }} >
            {showText ? "Messages" : <span className='opacity-0'>_</span>}
          </div>
        </div>
      </Link> */}
    </div>
  )
}