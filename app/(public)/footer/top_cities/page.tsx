'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { setSelectedProvince, setSelectedCity, setSkip, resetSearchResult } from '@/app/GlobalRedux/Features/search';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';

export default function TopCities() {
    const dispatch = useDispatch();
    const provinces = useSelector((state: RootState) => state.provincesReducer.provinces)
    const router = useRouter();
    const [cities, setCities] = useState<any>();
    const [limit, setLimit] = useState(10);

    const getCities = async () => {
        const fetch_cities = await fetch("/api/public/footer/top_cities", { method: "POST" })
        const response_cities = await fetch_cities.json()
        setCities(response_cities.data)
    }
    useEffect(() => {
        getCities();
    }, [])

    return (
        <div>
            <nav className="list-none mb-10">
                {cities?.map((city: any, i: number) => {
                    if (i >= limit) {
                        return
                    }
                    return <li key={i} className='mb-2'>
                        <Link onClick={(e) => {
                            e.preventDefault();

                            const find_province = provinces.find(province => province.id === city.provinceId)
                            const find_city = find_province?.city.find(found_city => found_city.id === city.id)
                            dispatch(setSkip(0));
                            dispatch(resetSearchResult())
                            dispatch(setSelectedProvince(find_province as Province))
                            dispatch(setSelectedCity(find_city as City))
                            router.push("/?r=ok")

                        }} href={'#'}><span>{city.name}</span></Link>
                        {/* <a href={`/?page=1&pid=${city.provinceId}&cid=${city.id}`} className="hover:text-green-500">{city.name}</a> */}
                    </li>
                })}

            </nav>

        </div>
    )
}
