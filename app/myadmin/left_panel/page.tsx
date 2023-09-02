'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { SettingOutlined, LeftCircleOutlined, RightCircleOutlined, ApartmentOutlined, MessageOutlined, ProfileOutlined, AppstoreAddOutlined, AppstoreOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { usePathname } from 'next/navigation';


interface Props {
  params: {
    showLeftPanel: boolean,
    openLeftPanel: any,
    onClose: any,
    closeLeftPanel: () => void

  }
}

export default function LeftAdminPanel({ params: { showLeftPanel, openLeftPanel, onClose, closeLeftPanel } }: Props) {
  const [showText, setShowText] = useState(true)
  const pathname = usePathname()


  useEffect(() => {
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
        className='hidden sm:flex cursor-pointer bg-slate-900 hover:bg-green-700  left-panel-heeader w-full justify-start items-center text-lg transition-all'
        style={{ height: "60px" }}
      >
        <div className='flex pl-3 items-center'>
          <div className='text-2xl'>
            {showLeftPanel ? <LeftCircleOutlined /> :
              <RightCircleOutlined />
            }
          </div>
          <div className={`ml-2  whitespace-nowrap ${showLeftPanel ? "" : "hidden"}`}>
            {"Admin Panel"}
          </div>
        </div>
      </div>
      <Link onClick={() => { onClose() }}
   
        href={"/myadmin/"}>
        <div className={`pl-3 py-3 hover:bg-slate-700 transition-all flex items-center hover:text-green-300 ${pathname === "/myadmin" ? "text-green-400" : ""}`}>

          <ApartmentOutlined className='mt-1 text-2xl' style={{ marginRight: "10px" }} />
          <div className='transition-all whitespace-nowrap ' style={{ opacity: showText ? 1 : 0 }} >
            {showText ? "Admin Dashboard" : <span className='opacity-0'>_</span>}
          </div>
        </div>
      </Link>

      <Link onClick={() => { onClose() }}
        
        href={"/myadmin/users"}>
        <div className={`pl-3 py-3 hover:bg-slate-700 transition-all flex items-center hover:text-green-300 ${pathname.startsWith("/myadmin/users") ? "text-green-400" : ""}`}>

          <AppstoreAddOutlined className='mt-1 text-2xl' style={{ marginRight: "10px" }} />
          <div className='transition-all whitespace-nowrap ' style={{ opacity: showText ? 1 : 0 }} >
            {showText ? "Manage Users" : <span className='opacity-0'>_</span>}
          </div>
        </div>
      </Link>
      <Link onClick={() => { onClose() }}
       
        href={"/myadmin/products"}>
        <div className={`pl-3 py-3 hover:bg-slate-700 transition-all flex items-center hover:text-green-300 ${pathname.startsWith("/myadmin/products") ? "text-green-400" : ""}`}>

          <AppstoreOutlined className='mt-1 text-2xl' style={{ marginRight: "10px" }} />
          <div className='transition-all whitespace-nowrap' style={{ opacity: showText ? 1 : 0 }} >
            {showText ? "Manage Products" : <span className='opacity-0'>_</span>}
          </div>
        </div>
      </Link>
      <Link onClick={() => { onClose() }}
       
        href={"/myadmin/orders"}>
        <div className={`pl-3 py-3 hover:bg-slate-700 transition-all flex items-center hover:text-green-300 ${pathname.startsWith("/myadmin/orders") ? "text-green-400" : ""}`}>

          <ShoppingCartOutlined className='mt-1 text-2xl' style={{ marginRight: "10px" }} />
          <div className='transition-all whitespace-nowrap' style={{ opacity: showText ? 1 : 0 }} >
            {showText ? "View All Orders" : <span className='opacity-0'>_</span>}
          </div>
        </div>
      </Link>
      <Link onClick={() => { onClose() }}
       
        href={"/myadmin/website_settings"}>
        <div className={`pl-3 py-3 hover:bg-slate-700 transition-all flex items-center hover:text-green-300 ${pathname.startsWith("/myadmin/user_messages") ? "text-green-400" : ""}`}>

          <SettingOutlined className='mt-1 text-2xl' style={{ marginRight: "10px" }} />
          <div className='transition-all whitespace-nowrap' style={{ opacity: showText ? 1 : 0 }} >
            {showText ? "Settings" : <span className='opacity-0'>_</span>}
          </div>
        </div>
      </Link>
      <Link onClick={() => { onClose() }}
        
        href={"/myadmin/seed_data"}>
        <div className={`pl-3 py-3 hover:bg-slate-700 transition-all flex items-center  hover:text-green-300 ${pathname.startsWith("/myadmin/seed_data") ? "text-green-400" : ""}`}>

          <ProfileOutlined className='mt-1 text-2xl' style={{ marginRight: "10px" }} />
          <div className='transition-all whitespace-nowrap' style={{ opacity: showText ? 1 : 0 }} >
            {showText ? "Seed Database" : <span className='opacity-0'>_</span>}
          </div>
        </div>
      </Link>

    </div>
  )
}