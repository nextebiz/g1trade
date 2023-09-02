'use client'

import React, { useEffect, useState } from 'react'
import { MenuOutlined } from "@ant-design/icons"
import LeftPanel from '../left_panel/page'
import { ConfigProvider, Drawer } from 'antd';

export default function AdminMenuLeft() {
    const openLeftPanelWidth = "230px"
    const closeLeftPanelWidth = "55px"
    const [leftPanelWidth, setLeftPanelWidth] = useState(openLeftPanelWidth)
    const [showLeftPanel, setShowLeftPanel] = useState(true)
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const openLeftPanel = () => {
        setShowLeftPanel(true)
    }
    const closeLeftPanel = () => {
        setShowLeftPanel(false)
    }
    useEffect(() => {
        showLeftPanel ? setLeftPanelWidth(openLeftPanelWidth) : setLeftPanelWidth(closeLeftPanelWidth)
    }, [
        showLeftPanel
    ])
    return (
        <div className='bg-white'>
            <div className='flex w-full clear-both '>
                <div
                    className='bg-slate-800 transition-all relative hidden md:block'
                    style={{ width: leftPanelWidth }}>
                    <LeftPanel params={{ showLeftPanel, openLeftPanel, onClose, closeLeftPanel }} />
                </div>
                <div className='text-black absolute block md:hidden'>
                    <div onClick={() => {
                        setShowLeftPanel(true)
                        showDrawer()
                    }} className=' flex items-center justify-center text-white' style={{ height: "60px", width: "40px" }}>
                        <MenuOutlined />
                    </div>

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
                            placement="left"
                            width={300}

                            onClose={onClose}
                            open={open}>

                            <LeftPanel params={{ showLeftPanel, openLeftPanel, onClose, closeLeftPanel }} />
                        </Drawer>
                    </ConfigProvider>
                </div>
            </div>
        </div>
    )
}
