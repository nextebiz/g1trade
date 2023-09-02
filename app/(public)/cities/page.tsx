'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { LeftOutlined } from "@ant-design/icons"
import { Spin } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import { setBrowseProvinces } from '@/app/GlobalRedux/Features/browse_cities';
import { setSelectedProvince, setSelectedCity, setSkip, setSearchLoaded, resetSearchResult } from '@/app/GlobalRedux/Features/search';


export default function BrowseByCities() {

    const router = useRouter();
    const [page_loaded, setPageLoaded] = useState(false)
    const provinces = useSelector((state: RootState) => state.citiesReducer.browse_provinces)
    const dispatch = useDispatch();

    useEffect(() => {
        if (provinces.length !== 0) {
            setPageLoaded(true)
        }
        if (provinces.length === 0) {
            const getData = async () => {
                const fetch_province = await fetch("/api/public/provinces", {
                    method: "POST",
                    next: { revalidate: 300 }
                });
                const response_province = await fetch_province.json();
                // setProvinces(response_province.data)
                dispatch(setBrowseProvinces(response_province.data))
                setPageLoaded(true)

            }
            getData()
        }
    }, [])

    return (
        <div className='' style={{ width: "100%" }}>
            <div className='text-black bg-white p-3 sm:p-5 pb-5 body-content' >
                <div className='text-2xl mb-6'>Browse G1 Garlic Sellers By City</div>
                <section>
                    {page_loaded ?
                        <div className='flex flex-wrap md:flex-nowrap'>
                            <div className='md:flex-1 '>

                                {provinces?.map((province: Province, i: number) => {
                                    return <div key={i}>
                                        {
                                            province?.city?.find((city) => {
                                                return city._count.product > 0;
                                            }) === undefined
                                                ?
                                                <div></div>
                                                :
                                                <div>
                                                    <Link
                                                        onClick={(e) => {
                                                            e.preventDefault()

                                                            const find_province = provinces.find((my_province: Province) => my_province.id === province.id)
                                                            if (find_province) {
                                                                dispatch(setSkip(0));
                                                                dispatch(resetSearchResult())
                                                                dispatch(setSelectedProvince(find_province as Province))
                                                                dispatch(setSelectedCity({} as City))
                                                                dispatch(setSearchLoaded(false))
                                                                router.push("/")
                                                            }
                                                        }}
                                                        href={"#"}
                                                    //href={`/?page=1&pid=${province.id}`}
                                                    >
                                                        <h2 className='text-lg text-black hover:text-green-600 transition-all'>{province.name}</h2>
                                                    </Link>
                                                    <div className='py-2'>
                                                        <hr />
                                                    </div>
                                                    <div>
                                                        {
                                                            province.city?.find((city) => {
                                                                return city._count.product > 0;
                                                            }) === undefined ? <div>
                                                                No sellers found
                                                            </div>
                                                                : ""
                                                        }
                                                    </div>
                                                    <div className='flex flex-wrap mb-10'>
                                                        {province.city?.map((city, i) => {
                                                            return <div key={i} className=''>
                                                                {city._count.product > 0 ?
                                                                    <Link
                                                                        onClick={(e) => {
                                                                            e.preventDefault()

                                                                            const find_province: any = provinces.find((my_province: Province) => my_province.id === city.provinceId)
                                                                            if (find_province) {
                                                                                const find_city = find_province.city.find((my_city: City) => my_city.id === city.id)
                                                                                dispatch(setSkip(0));
                                                                                dispatch(resetSearchResult())
                                                                                dispatch(setSelectedProvince(find_province as Province))
                                                                                dispatch(setSelectedCity(find_city as City))
                                                                                dispatch(setSearchLoaded(false))
                                                                                router.push("/")
                                                                            }

                                                                        }}
                                                                        href={"#"}
                                                                    >
                                                                        <div className='bg-slate-200 py-2 m-1 px-4 rounded-full text-black hover:text-white hover:bg-green-600 transition-all'>
                                                                            {city.name} <span className='text-xs ml-2'>({city._count.product} {city._count.product > 1 ? "sellers" : "seller"})</span>
                                                                        </div>
                                                                    </Link>

                                                                    : ""
                                                                }
                                                            </div>
                                                        })}
                                                    </div>

                                                </div>
                                        }
                                    </div>
                                })}
                            </div>
                        </div>
                        :
                        <div className='flex'>
                            <div>
                                <Spin />
                            </div>
                            <div className='ml-2 text-sm'>Loading...</div>
                        </div>
                    }
                </section>
            </div >
        </div >
    )
}



