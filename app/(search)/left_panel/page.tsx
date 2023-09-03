'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { CheckOutlined, CaretRightOutlined, LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons"
import { getUserFromSession } from '@/utils/getUserFromSession'
import { usePathname } from 'next/navigation'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/app/GlobalRedux/store'
import { setSelectedCategory, setSelectedCity, setSelectedProvince, setSkip } from "../../GlobalRedux/Features/search"
import { Spin } from 'antd'

interface Props {
  params: {
    showLeftPanel: boolean,
    openLeftPanel: any,
    onClose: any,
    closeLeftPanel: () => void

  }
}

export default function SearchLeftPanel({ params: { showLeftPanel, openLeftPanel, onClose, closeLeftPanel } }: Props) {


  const categories = useSelector((state: RootState) => state.categoriesReducer.categories)
  const provinces = useSelector((state: RootState) => state.provincesReducer.provinces)

  const selected_category = useSelector((state: RootState) => state.searchReducer.selected_category)
  const selected_province = useSelector((state: RootState) => state.searchReducer.selected_province)
  const selected_city = useSelector((state: RootState) => state.searchReducer.selected_city)
  const search_result = useSelector((state: RootState) => state.searchReducer.search_result)

  // console.log("selected_province")
  // console.log(selected_province)

  const dispatch = useDispatch();


  const [showText, setShowText] = useState(true)
  const [user, setUser] = useState({} as User)

  const pathname = usePathname();

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
          <div className={`ml-3 whitespace-nowrap ${showLeftPanel ? "" : "hidden"}`}>
            {"Search Panel"}
          </div>
        </div>
      </div>

      <div>
        <div className={`pl-3 py-3 bg-slate-700 transition-all flex items-center `}>
          <CheckOutlined className='mt-1 text-lg' style={{ marginRight: "10px" }} />
          <div className='transition-all whitespace-nowrap text-xl w-full' style={{ opacity: showText ? 1 : 0 }} >
            <div className='flex items-center justify-between  w-full'>

              <div>Categories</div>

              {selected_category?.id !== undefined ?
                <div className='mr-5 text-sm'>
                  <Link
                  title={`sell g1 garlic in ${selected_category.name}`}
                    onClick={(e) => {
                      e.preventDefault()
                      dispatch(setSkip(0))
                      dispatch(setSelectedCategory({} as Category))
                    }}
                    href={"#"}><span className='text-blue-400'>SHOW ALL</span></Link>
                </div>
                : ""}
            </div>
          </div>
        </div>
        {categories.map(category => {
          return <div key={category.id as string}>
            <Link
            title={`${category.name} for sale`}
              onClick={(e) => {
                dispatch(setSkip(0))
                dispatch(setSelectedCategory(category))
                e.preventDefault()
                onClose()
              }}
              href={"#"}>
              <div className={`pl-0 md:pl-4 hover:pl-5 py-2 ${selected_category?.id === category.id ? "bg-green-700" : ""} ${selected_category?.id === category.id ? " hover:bg-green-700 " : " hover:bg-slate-700 "}transition-all flex items-center hover:text-green-300 ${pathname === "/buyer" ? "text-green-400" : ""}`}>
                <CaretRightOutlined />
                <div className='mr-3'></div>
                <div className='transition-all whitespace-nowrap text-sm' style={{ opacity: showText ? 1 : 0 }} >
                  {showText ? category.name : <span className='opacity-0'>_</span>}
                </div>
              </div>
            </Link>
          </div>
        })}
        {categories.length === 0 ? <div>
          <div className='ml-3 py-3'>
            <Spin />
            <span className='ml-2'>Loading...</span>
          </div>
        </div> : ""}
      </div>
      {/* : ""} */}

      {/* {selected_province?.id === undefined ? */}
      <div>
        <div className={`pl-3 py-3 bg-slate-700 transition-all flex items-center `}>
          <CheckOutlined className='mt-1 text-lg' style={{ marginRight: "10px" }} />
          <div className='transition-all whitespace-nowrap text-xl w-full' style={{ opacity: showText ? 1 : 0 }} >
            {showText ?
              <div className='flex items-center justify-between  w-full'>
                <div>Provinces</div>
                {selected_province?.id !== undefined ?
                  <div className='mr-5 text-sm'>
                    <Link
                    title={`G1 garlic for sale in ${selected_province.name}`}
                      onClick={(e) => {
                        e.preventDefault()
                        dispatch(setSkip(0))
                        dispatch(setSelectedProvince({} as Province))
                        dispatch(setSelectedCity({} as City))
                      }}
                      href={"#"}><span className='text-blue-400'>SHOW ALL</span></Link>
                  </div>
                  : ""}
              </div>
              : <span className='opacity-0'>_</span>}
          </div>
        </div>
        {provinces.map(province => {
          return <div key={province.id as string}>
            {province._count.product > 0 ?
              <Link
              title={`G1 garlic for sale in ${province.name}`}
                onClick={(e) => {
                  dispatch(setSkip(0))
                  dispatch(setSelectedProvince(province))
                  dispatch(setSelectedCity({} as City))
                  e.preventDefault()
                  onClose()
                }}
                href={"#"}>
                <div className={`pl-0 md:pl-4 hover:pl-5 py-2 ${selected_province?.id === province.id ? "bg-green-700" : ""} ${selected_province?.id === province.id ? " hover:bg-green-700 " : " hover:bg-slate-700 "}transition-all flex items-center hover:text-green-300 ${pathname === "/buyer" ? "text-green-400" : ""}`}>
                  <div className=''>
                    <CaretRightOutlined />
                  </div>
                  <div className='mr-3'></div>
                  <div className={`transition-all whitespace-nowrap text-sm ${province._count.product > 0 ? "" : "opacity-20"}`} >
                    {showText ? <div className='flex items-center'>
                      <span className='mr-3'>{province.name}</span>
                      <span className={`${province._count.product > 0 ? "bg-slate-600" : "bg-slate-600"} text-sm p-2  flex  items-center justify-center w-7 h-7 rounded-full`}>
                        <span>{province._count.product}</span>
                      </span>
                    </div> : <span className='opacity-0'>_</span>}
                  </div>
                </div>
              </Link>
              : ""}
          </div>
        })}
        {provinces.length === 0 ? <div>
          <div className='ml-3 py-3'>
            <Spin />
            <span className='ml-2'>Loading...</span>
          </div>
        </div> : ""}
      </div>
      {/* // : ""} */}

      {selected_province?.id !== undefined ?
        // selected_city?.id === undefined ?
        <div>
          <div className={`pl-3 py-3 bg-slate-700 transition-all flex items-center `}>
            <CheckOutlined className='mt-1 text-lg' style={{ marginRight: "10px" }} />
            <div className='transition-all whitespace-nowrap text-lg w-full' style={{ opacity: showText ? 1 : 0 }} >
              <div className='flex items-center justify-between  w-full'>
                <div>Cities</div>
                {selected_city?.id !== undefined ?
                  <div className='mr-5 text-sm'>
                    <Link
                    title={`G1 garlic for sale in ${selected_city.name}`}
                      onClick={(e) => {
                        e.preventDefault()
                        dispatch(setSkip(0))
                        dispatch(setSelectedCity({} as City))
                      }}
                      href={"#"}><span className='text-blue-400'>SHOW ALL</span></Link>
                  </div>
                  : ""}
              </div>
            </div>
          </div>
          {selected_province.city.map(city => {
            return <div key={city.id as string}>
              {city._count.product > 0 ?
                <Link
                title={`Sell g1 garlic in ${city.name}`}
                  onClick={(e) => {
                    dispatch(setSkip(0))
                    dispatch(setSelectedCity(city))
                    e.preventDefault()
                    onClose()
                  }}
                  href={"#"}>
                  <div className={`pl-0 md:pl-4 hover:pl-5 py-2 ${selected_city?.id === city.id ? "bg-green-700" : ""} ${selected_city?.id === city.id ? " hover:bg-green-700 " : " hover:bg-slate-700 "}transition-all flex items-center hover:text-green-300 ${pathname === "/buyer" ? "text-green-400" : ""}`}>
                    <div className=''>
                      <CaretRightOutlined />
                    </div>
                    <div className='mr-3'></div>
                    <div className='transition-all whitespace-nowrap text-sm' style={{ opacity: showText ? 1 : 0 }} >
                      <div className='flex items-center'>
                        <span className='mr-3'>{city.name}</span>
                        <span className={`${city._count.product > 0 ? "bg-slate-600" : "bg-slate-600"} text-sm p-2  flex  items-center justify-center w-7 h-7 rounded-full`}>
                          <span>{city._count.product}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
                : ""}
            </div>
          })}
        </div>
        // : ""
        : ""}
    </div>
  )
}