'use client'
import { useEffect, useState } from 'react';
import { RootState } from '../../GlobalRedux/store'
import { useSelector, useDispatch } from 'react-redux'
import { addCategories } from '../../GlobalRedux/Features/categories';
import { addProvinces } from '../..//GlobalRedux/Features/provinces';
import { setSkip, setTotal, setSearchResult, setSearchLoaded, resetSearchResult, setSelectedCategory, setSelectedCity, setSelectedProvince } from '@/app/GlobalRedux/Features/search';
import SearchMenuLeft from '../menu_left/page';
import { Button, Select, Spin } from 'antd';
import RightPanelProduct from '../right_panel_product/page';
import Link from 'next/link';


interface Props {
  params: {
    session: any
  }
}


export default function HomePublic({ params: { session } }: Props) {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categoriesReducer.categories)
  const provinces = useSelector((state: RootState) => state.provincesReducer.provinces)

  const selected_category = useSelector((state: RootState) => state.searchReducer.selected_category)
  const selected_province = useSelector((state: RootState) => state.searchReducer.selected_province)
  const selected_city = useSelector((state: RootState) => state.searchReducer.selected_city)
  const take = useSelector((state: RootState) => state.searchReducer.take)
  const skip = useSelector((state: RootState) => state.searchReducer.skip)
  const total = useSelector((state: RootState) => state.searchReducer.total)
  const search_result = useSelector((state: RootState) => state.searchReducer.search_result)
  const search_loaded = useSelector((state: RootState) => state.searchReducer.search_loaded)

  const [page_loaded, setPageLoaded] = useState(false)
  const [menu_loaded, setMenuLoaded] = useState(false)
  const [products_loaded, setProductsLoaded] = useState(false)
  const [order_by, setOrderBy] = useState("latest"); //orders


  const handleSearchFilter = (value: string) => {
    // console.log(`selected ${value}`);
    setOrderBy(value)
  };

  useEffect(() => {
    const getCats = async () => {
      if (categories.length === 0) {
        const fetch_data = await fetch("/api/initial_data", { method: "post" })
        const response_data = await fetch_data.json()

        const tmp_categories = response_data.data.categories;
        const tmp_provinces = response_data.data.provinces;
        tmp_categories.map((cat: Category) => {
          dispatch(addCategories(cat))
          return cat;
        })

        tmp_provinces.map((province: Province) => {
          dispatch(addProvinces(province))
        })
        setMenuLoaded(true)
      }

    };
    getCats();
  }, []);


  const get_products = async () => {
    setProductsLoaded(false)
    const form_data = new FormData();

    form_data.set("buyer_id", session?.user.id as string);
    form_data.set("category_id", selected_category?.id as string);
    form_data.set("province_id", selected_province?.id as string);
    form_data.set("city_id", selected_city?.id as string);
    form_data.set("take", take.toString())
    form_data.set("skip", skip.toString())
    form_data.set("order_by", order_by)
    try {
      const fetch_products = await fetch("/api/public/products", { method: "post", body: form_data })
      const response_products = await fetch_products.json()
      dispatch(setSearchLoaded(true))

      dispatch(setTotal(response_products.stats.count))
      dispatch(setSkip(response_products.stats.skip))

      if (response_products.data.length > 0) {
        response_products.data.map((product: Product) => {
          dispatch(setSearchResult(product))
          return product;
        })
      }
      dispatch(setSearchLoaded(true))
      setPageLoaded(true)
      setProductsLoaded(true)
    } catch (err) {
      console.log("error",
        alert(`Failed to connect to database. Please refresh. Error message: ` + err)
      )
    }
  }

  useEffect(() => {
    if (search_loaded === false) {
      get_products()
    }
  }, [skip])

  useEffect(() => {

    if (search_loaded === true) {
      if (page_loaded) {
        dispatch(resetSearchResult())
        get_products()
      }
      else if (search_result.length === 0) {
        dispatch(resetSearchResult())
        get_products()
      }
    }
    if (search_result.length > 0) {
      setPageLoaded(true)
    }

  }, [selected_category, selected_province, selected_city, order_by])

  return (
    <main className="">
      <div className='text-black bg-white' style={{ minHeight: "400px" }}>

        <div className='flex'>
          <div className='text-white'>
            <SearchMenuLeft />
          </div>
          <div className='' style={{ width: "100%" }}>
            <div className='' style={{ width: "100%" }}>
              <div style={{ height: "60px" }} className='bg-slate-700 flex items-center'>
                <div className='w-full  '>
                  <div className='text-white ml-10 md:ml-6'>
                    <span>Search G1 Garlic Sellers <span className='hidden md:inline-block'>Near You</span></span>
                    {selected_category?.id !== undefined || selected_province?.id !== undefined || selected_city?.id !== undefined ?
                      <span>
                        <Link onClick={(e) => {

                          dispatch(setSelectedCategory({} as Category))
                          dispatch(setSelectedProvince({} as Province))
                          dispatch(setSelectedCity({} as City))


                        }} href={"#"}><span className='text-blue-300 ml-2 md:ml-3'>Show All <span className='hidden md:inline-block'>Products</span></span></Link>
                      </span>
                      : ""}
                  </div>
                </div>
              </div>
              <div className='flex items-center justify-between mx-3'>
                <div>

                </div>
                <div className='flex items-center'>
                  <div className='mr-2 pt-2 text-sm'>
                    Search By:
                  </div>
                  <div className='mt-2'>
                    <Select
                      style={{ width: 150 }}
                      onChange={handleSearchFilter}
                      placeholder="Filter Search"
                      options={[
                        { value: 'latest', label: 'Latest Products' },
                        { value: 'orders', label: 'Best Sellers' },
                      ]}
                    />
                  </div>
                </div>
              </div>
           
              <div className='text-black bg-white pb-6 md:ml-3 ' style={{ minHeight: "400px" }}>
                <section>
                  {page_loaded ?
                    <div>
                      {search_result.map((product: Product) => {
                        return <div key={product.id as string}>
                          <RightPanelProduct params={{ product: product }} />
                        </div>
                      })}
                      <hr />

                      {search_result.length === 0 ?
                        products_loaded ?
                          <div className='p-3'>
                            No results found. <Link
                              onClick={() => {
                                dispatch(setSkip(0))
                                dispatch(setSelectedCategory({} as Category))
                                dispatch(setSelectedProvince({} as Province))
                                dispatch(setSelectedCity({} as City))
                              }}
                              href={"#"}><span className='text-blue-500'>Click here</span></Link> to show all products.
                          </div>

                          : <div className='flex items-center ml-3 mt-3'>
                            <div>
                              <Spin />
                            </div>
                            <div className='ml-2'>Searching...</div>
                          </div>

                        :
                        <div className='m-3'>

                          <div className='my-3 flex justify-center md:justify-start'>
                            Displating {search_result.length} of  {total} results
                          </div>

                          {(take + skip) >= total ? "" :

                            <div className='flex justify-center md:justify-start'>
                              <div>
                                <Button size='large' onClick={() => {
                                  dispatch(setSearchLoaded(false))
                                  dispatch(setSkip(skip + take))

                                }}>Load More Sellers ...</Button>
                              </div>

                              {search_loaded ? "" :
                                <div className='flex items-center ml-3'>
                                  <div>
                                    <Spin />
                                  </div>
                                  <div className='ml-2'>Loading...</div>
                                </div>
                              }
                            </div>
                          }
                        </div>
                      }


                    </div>

                    :
                    <div className='flex items-center p-6'>
                      <div>
                        <Spin />
                      </div>
                      <div className='ml-2'>Loading...</div>
                    </div>
                  }
                </section>

              </div >

            </div >
          </div>
        </div>



      </div>

    </main>
  )
}
