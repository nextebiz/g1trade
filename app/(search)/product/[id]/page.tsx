'use client'
import React, { useEffect, useState } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { FacebookFilled, FacebookOutlined, ExclamationCircleOutlined, LoadingOutlined, HeartOutlined, HeartFilled, FieldTimeOutlined, DollarOutlined, CheckCircleOutlined, LoginOutlined, StarFilled, StarOutlined, LeftOutlined, ShoppingCartOutlined, WhatsAppOutlined, PhoneOutlined } from '@ant-design/icons'
import { Button, Spin, Input, Form, Select, ConfigProvider, Rate } from 'antd';
import Link from 'next/link';
import { getUserFromSession } from '@/utils/getUserFromSession';
import { signIn } from 'next-auth/react';
import TextArea from 'antd/es/input/TextArea';
import { Order } from '@prisma/client';
import dayjs from 'dayjs';
import ProductRatings from '../rating/page';
import { FacebookShareButton, WhatsappShareButton } from 'react-share';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import { setProductLike } from '@/app/GlobalRedux/Features/search';
import getRandomKeyword from '@/utils/getRandomKeyword';



export default function ProductDisplay() {

  const dispatch = useDispatch()

  const params = useParams();
  const pathName = usePathname();
  const { id } = params;
  const router = useRouter();

  const search_result = useSelector((state: RootState) => state.searchReducer.search_result)

  const [product, setProduct] = useState<Product>({} as Product)
  const [page_loaded, setPageLoaded] = useState(false)
  const [selected_image_url, setSelectedImageUrl] = useState("")
  const [user, setUser] = useState<User>({} as User);
  const [weight_units, setWeightUnits] = useState([
    "KILOGRAM",
    "MAUND",
    "TONNE",
  ])
  const [order_weight, setOrderWeight] = useState<number>(0)
  const [order_weight_units, setOrderWeightUnits] = useState<string>("")
  const [note, setNote] = useState<string>('')
  const [is_saved, setIsSaved] = useState<boolean>(false)
  const [is_saving, setIsSaving] = useState<boolean>(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [total_orders, setTotalOrders] = useState(0)
  const [like, setLike] = useState(false)
  const [like_clicked, setLikeClicked] = useState(false);
  const [total_likes, setTotalLikes] = useState(0)
  const [ordering_limit, setOrderingLimit] = useState(5)

  const getAverageOfStars = (stars: []) => {
    const nums = stars.map((star: any) => {
      return star.stars
    })
    const sum = nums.reduce((a, b) => a + b, 0);
    const avg = (sum / nums.length) || 0;
    return avg
  }

  const checkExpiryDays = (product_user: User) => {
    let days = 0;
    days = dayjs().diff(dayjs(product_user.expiryDate), "days");
    return days;
  }

  const getCitiesString = (productCities: ProductCity[]) => {
    const total = productCities.length;
    const city_html = productCities.map((my_city: any, i: number) => {
      if (i < total) {
        let comma = ",";
        if ((i + 1) === total) {
          comma = ""
        }
        if ((i + 1) === total) {
          comma = ""
        }
        return <div key={i} className='mr-1 flex flex-wrap'>
          <div>{my_city.City.name}{comma}</div>
        </div>
      }
    })
    return <div className='flex flex-wrap'>{city_html}</div>
  }

  const onFinish = (values: any) => {
    submitOrder()
  };

  const onFinishFailed = (errorInfo: any) => {
  };

  const get_cover_image = (myproduct: Product) => {

    const selected_cover_id = myproduct.image_cover_id;

    if (myproduct?.images[0] === undefined) {
      return undefined
    }

    if (selected_cover_id === null) {
      return myproduct?.images[0];
    }

    const find_image = myproduct?.images?.find((my_image: ImageProduct) => {
      return my_image.id === selected_cover_id
    })

    if (find_image !== null) {
      return find_image
    }

    return myproduct?.images[0];
  }

  async function likeProduct() {
    if (like_clicked) {

      const form_data = new FormData();
      form_data.set("product_id", product?.id)
      form_data.set("user_id", user?.id)

      const fetch_save = await fetch("/api/public/products/product/like", {
        method: "POST",
        body: form_data,
        next: { revalidate: 300 }
      })

      const response_save = await fetch_save.json();
      if (response_save.status === 200) {
        setTotalLikes(response_save.data.likes)
        if (response_save.data.liked === "yes") {
          setLike(true)
          if (search_result.length > 0) {
            dispatch(setProductLike({
              product: product,
              perform: "add"
            }))
          }
          // product._count.ProductLikes += 1;
        } else {
          // product._count.ProductLikes -= 1;
          setLike(false)
          if (search_result.length > 0) {
            dispatch(setProductLike({
              product: product,
              perform: "remove"
            }))
          }
        }

        // console.log(product)

        setIsSaved(true)
      } else {
        setIsSaved(false)
      }
      setLikeClicked(false)
    }
  }

  type EmailOptions = {
    seller_name: string,
    buyer_name: string,
    buyer_phone: string,
    buyer_whatsapp: string,
    seller_phone: string,
    seller_whatsapp: string,
    seller_email: string,
    buyer_email: string,
    product_name: string,
    product_id: string,
    price: string,
    price_units: string,
    order_quantity: string,
    order_units: string,
    message: string,
  }

  async function sendEmailOnOrder(email_options: EmailOptions) {
    const form_data = new FormData();
    form_data.set("seller_name", email_options.seller_name);
    form_data.set("buyer_name", email_options.buyer_name);
    form_data.set("buyer_phone", email_options.buyer_phone);
    form_data.set("buyer_whatsapp", email_options.buyer_whatsapp);
    form_data.set("seller_phone", email_options.seller_phone);
    form_data.set("seller_whatsapp", email_options.seller_whatsapp);
    form_data.set("seller_email", email_options.seller_email);
    form_data.set("buyer_email", email_options.buyer_email);
    form_data.set("product_name", email_options.product_name);
    form_data.set("product_id", email_options.product_id);
    form_data.set("price", email_options.price);
    form_data.set("price_units", email_options.price_units);
    form_data.set("order_quantity", email_options.order_quantity);
    form_data.set("order_units", email_options.order_units);
    form_data.set("message", email_options.message);
    const fetch_sendOrderEmail = await fetch("/api/email/order", { method: "POST", body: form_data })
    const response_sendOrderEmail = await fetch_sendOrderEmail.json()
    console.log(response_sendOrderEmail)
  }

  async function submitOrder() {

    //note: string, order_weight: number, order_weight_units: string
    setIsSaved(false)
    setIsSaving(true)
    const form_data = new FormData();
    form_data.set("product_id", product?.id)
    form_data.set("note", note)
    form_data.set('weight', order_weight.toString())
    form_data.set("weight_units", order_weight_units.toString())
    form_data.set("user_id", user?.id.toString())

    const fetch_save = await fetch("/api/buyer/orders/place_order", {
      method: "POST",
      body: form_data,
      next: { revalidate: 300 }
    })
    const response_save = await fetch_save.json();

    // send email to seller
    sendEmailOnOrder({
      seller_name: product.User.name,
      buyer_name: user?.name,
      buyer_phone: user?.phone1,
      buyer_whatsapp: user?.phone2,
      seller_phone: product.User.phone1,
      seller_whatsapp: product.User.phone2,
      seller_email: product.User.email,
      buyer_email: user?.email,
      product_name: product.title,
      product_id: product.id,
      price: product.price.toString(),
      price_units: product.priceUnit,
      order_quantity: order_weight.toString(),
      order_units: order_weight_units,
      message: note
    })

    setIsSaving(false)

    if (response_save.status === 200) {
      // saved
      setIsSaved(true)
    } else {
      setIsSaved(false)
    }
  }

  const findOrders = async () => {

    const form_data = new FormData();
    form_data.set("buyer_id", user?.id)
    form_data.set("product_id", product?.id)

    const fetch_orders = await fetch("/api/buyer/orders/find_orders_by_product_id", {
      method: "POST",
      body: form_data,
      next: { revalidate: 300 }

    })
    const response_orders = await fetch_orders.json();

    if (response_orders.status === 200) {
      setOrders(response_orders.data)
    }
  }


  useEffect(() => {

    const getProduct = async () => {
      const get_user_from_session = await getUserFromSession();
      if (get_user_from_session?.phone1 === null || get_user_from_session?.phone2 === null) {
        router.push("/signin/verify_info")
        return;
      }
      setUser(get_user_from_session)

      let find_product: Product | undefined = undefined

      if (search_result.length > 0) {
        find_product = search_result.find((product_filter: Product) => {
          return product_filter.id === id
        })
        if (find_product) {
          setProduct(find_product)
        }
      }


      if (search_result.length === 0) {
        const form_data = new FormData()
        form_data.set("product_id", id as string)
        form_data.set("buyer_id", get_user_from_session?.id as string)
        const fetch_product = await fetch("/api/public/products/product",
          {
            method: "POST",
            body: form_data,
            next: { revalidate: 300 }
          });
        const response_product = await fetch_product.json()

        if (response_product.status === 200) {
          find_product = response_product.data;
          setProduct(response_product.data)
        }
        // console.log(find_product)

        // if (response_product?.like === "yes") {
        //   setLike(true)
        // }
        if (response_product.status === 200) {

          setTotalOrders(response_product.data._count.Order)
          setTotalLikes(response_product.data._count.ProductLikes)

        }
      }
      if (find_product) {

        setTotalLikes(find_product._count.ProductLikes)
        setTotalOrders(find_product._count.Order)
        if (find_product) {
          if (find_product?.ProductLikes.length > 0) {
            setLike(true)
          }
        }

        if (find_product && find_product.images.length > 0) {
          setSelectedImageUrl(get_cover_image(find_product)?.url as string)
        } else {
          if (find_product.Category?.name == "G1 Garlic Dry") {
            setSelectedImageUrl("/images/g1garlic-dry-no-image.jpg")
          }
          if (find_product.Category?.name == "G1 Garlic Fresh (Wet)") {
            setSelectedImageUrl("/images/g1garlic-wet-no-image.jpg")
          }
        }
      }
      setPageLoaded(true)
      // router.prefetch("/?page=1")

      // } else {
      //   setPageLoaded(true)
      // }

    }
    getProduct()
  }, [])

  useEffect(() => {
    if (product?.id !== undefined) {

      findOrders()

    }
  }, [product])

  useEffect(() => {
    if (product?.id !== undefined) {
      if (is_saved) {
        findOrders()
      }
    }
  }, [is_saved])

  useEffect(() => {
    likeProduct()
  }, [like_clicked])


  return (
    <div className='' style={{ width: "100%" }}>
      <div style={{ height: "60px" }} className='bg-slate-700 flex items-center'>
        <div className='flex pl-2 md:pl-5 items-center'>
          <Link href={'/?page=1'}>
            <div className='text-2xl bg-slate-800 px-2 py-1 rounded-lg scale-100 hover:scale-110'>
              <LeftOutlined />
            </div>
          </Link>
          <div className='ml-3'>
            Product Details
          </div>
        </div>
      </div>
      <div className='text-black bg-white p-0 md:p-5 pb-5 body-content' >
        <section>
          {page_loaded ?
            product?.id !== undefined ?

              checkExpiryDays(product?.User) > 0 ?
                <div>
                  Product ad has expired. Go to <a href='/'><span className='text-blue-500'>www.g1trade.com</span></a> to search more products.
                </div>
                :
                <div className='flex flex-wrap md:flex-nowrap'>
                  <div className='md:flex-1 w-full'>

                    <div className='flex w-full bg-slate-300 mb-3 md:mb-0'>
                      <div className='bg-slate-300 flex-1  border-r border-r-slate-400'>
                        <img src={selected_image_url}
                          alt={`Sell G1 Garlic, ${getRandomKeyword()}`}
                          className='p-1 md:p-2 w-full' />
                      </div>

                      {product?.images?.length > 1 ?
                        <div className='flex flex-col justify-center w-16 md:w-24 h-full bg-slate-300 p-1 md:p-2'>
                          {product?.images?.map((my_image: any) => {
                            return <div key={my_image.id}
                              onClick={() => {
                                setSelectedImageUrl(my_image?.url)

                              }}
                              className='mb-1 md:mb-2 cursor-pointer'>

                              <img src={my_image?.url}
                                alt={`Sell G1 Garlic, ${getRandomKeyword()}`}
                                className=' md:rounded-lg' />
                            </div>
                          })}

                        </div>
                        : ""}
                    </div>

                  </div>
                  <div className='px-0 flex-1'>
                    <div className='px-3'>
                      {/* <Link href={`/product/${product.id}`}> */}
                      <h2 className='text-xl md:text-2xl lg:text-3xl mb-2 capitalize'>{product?.title}</h2>
                      {/* </Link> */}
                      <div className='flex items-center align-middle  mb-3'>
                        <p className='text-md md:text-xl'><span className='mr-2 '>Price:</span><span className=''>Rs {product?.price} </span></p>
                        <div className='ml-0 md:ml-2 capitalize text-sm'><span className='mr-1'>/</span><span>{product?.priceUnit.toLowerCase()}</span></div>
                        <span className='mx-4'>|</span>

                        <div onClick={() => {
                          if (user?.id === undefined) {
                            router.push("/signin")
                          } else {
                            // setLike(!like)
                            setLikeClicked(true)
                          }
                        }} className='scale-100 hover:scale-110 transition-all hover:cursor-pointer select-none'>
                          <span className='text-red-500'>
                            {like_clicked ? <LoadingOutlined /> :
                              like ? <HeartFilled /> : <HeartOutlined />
                            }
                          </span>
                          <span className='ml-2 text-sm'><span className='mr-1'>{total_likes}</span>{total_likes === 1 ? 'Like' : "Likes"}</span>
                        </div>

                      </div>
                      <div className='flex items-center align-middle'>
                        <p className=''>Stock Available for Sale:</p>
                        <span className='ml-0 md:ml-2 '>{product?.weight}<span className='ml-1 capitalize'>{product?.weightUnit.toLowerCase()}</span></span>
                      </div>
                      <div>
                        <div className='mt-3 flex items-center'>
                          <div className='mr-5 text-xs'>Share:</div>
                          <div className='mr-5'>
                            <FacebookShareButton url={process.env.NEXT_PUBLIC_SERVER_PATH + pathName}
                            >
                              {/* <FacebookIcon round size="32px" /> */}
                              <span className='text-2xl text-blue-600'><FacebookFilled /></span>
                            </FacebookShareButton>
                          </div>
                          <div className='mr-5'>
                            <WhatsappShareButton url={process.env.NEXT_PUBLIC_SERVER_PATH + pathName}
                            >
                              {/* <WhatsappIcon round size="32px" /> */}
                              <span className='text-2xl text-green-600'><WhatsAppOutlined /></span>
                            </WhatsappShareButton>
                          </div>
                        </div>

                      </div>

                      {product?.receiveOffers ?
                        <div>
                          <div className='py-0'>
                            <hr />
                          </div>
                          <div className=''>
                            <Form
                              name="basic"
                              style={{ maxWidth: "100%" }}
                              initialValues={{ remember: true }}
                              onFinish={() => { }}
                              onFinishFailed={() => { }}
                              autoComplete="off"
                            >
                              <div className='mt-4'>
                                <div className='flex items-center'>
                                  <div className='text-lg mr-2'>Place an Offer</div>
                                  <div className='text-xs'>(22 Offers Received)</div>
                                </div>
                                <div className='flex flex-col justify-start mt-2'>

                                  <div style={{ width: "150px" }} >
                                    <Form.Item
                                      name="amount_offer"
                                      rules={[{ required: true, message: 'Amount is required' }]}
                                    >
                                      <Input
                                        style={{ width: "100%" }}
                                        placeholder='Offer Amount'
                                        type='number'
                                        min={0}
                                        value={""}
                                        onChange={(e) => { }}
                                      />
                                    </Form.Item>
                                  </div>
                                  <div className=''>
                                    <Form.Item
                                      name="offer_weightUnits"
                                      rules={[{ required: true, message: 'Select Weight Units' }]}
                                    >
                                      <Select
                                        placeholder='Measure Unit'

                                        style={{ width: "150px" }}
                                        onChange={e => {
                                          // setSelectedWeightUnit(e)
                                        }}
                                      >
                                        {weight_units.map(unit_str => {
                                          return (
                                            <Select.Option key={unit_str} value={`${unit_str}`}>{unit_str}</Select.Option>
                                          )
                                        })}
                                      </Select>
                                    </Form.Item>
                                  </div>

                                </div>
                                <Button size='large' htmlType="submit">
                                  <div className='text-white flex items-center'>
                                    <div className='mr-2 text-xl'><DollarOutlined /></div>
                                    <div>Place Offer</div>

                                  </div>

                                </Button>
                              </div>

                            </Form>
                          </div>
                          <div className='pt-6 pb-6'>
                            <hr />
                          </div>
                        </div>
                        :

                        <div className='pt-6 pb-6'>
                          <hr />
                        </div>
                      }

                      <div className=''>
                        {product?.description}
                      </div>
                      <div className='pt-6 pb-6'>
                        <hr />
                      </div>
                    </div>

                    {user?.id === undefined ?
                      <div className='px-3'>
                        <div className=''>
                          <div className='flex items-center'>
                            <div className='text-lg mr-2'>Place Order</div>
                            <div className='text-sm'>({total_orders} Orders Placed)</div>
                          </div>
                          <Button size='large' onClick={() => {
                            sessionStorage.setItem("signin_url", pathName)
                            signIn()
                          }}>
                            <div className='text-white flex items-center'>
                              <div className='text-xl'>
                                <LoginOutlined />
                              </div>
                              <span className='ml-2'>
                                Login to Place Order
                              </span>
                            </div>
                          </Button>
                        </div>
                      </div>
                      :
                      <div>

                        <div className=''>
                          {orders?.length > 0 ? <div>

                            <h2 className='text-lg mb-2 px-3'>Previous Orders</h2>

                            <div className="w-screen md:w-full px-3 relative overflow-x-auto  bg-white " style={{
                              // width: "350px", minWidth: "350px"

                            }}>
                              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 p-5"
                              // style={{ width: "60%"}}
                              >
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                  <tr>
                                    <th scope="col" className="px-6 py-3">
                                      Order Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                      Quantity
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                      Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                      View Details
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {orders.map(my_order => {
                                    return (
                                      <tr key={my_order.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                          {
                                            dayjs(
                                              Date.parse(my_order.createdAt.toString())
                                            ).format("DD-MMM-YYYY")
                                          }
                                        </th>
                                        <td className="px-6 py-4">
                                          {my_order.weight}<span className='ml-2 capitalize'>{my_order.weightUnit.toLowerCase()}</span>
                                        </td>
                                        <td className="px-6 py-4">

                                          <div className='whitespace-nowrap'>
                                            {my_order.orderAction === "PENDING" ?
                                              <span className='text-lg'><FieldTimeOutlined />
                                              </span> : ""}

                                            <span className='ml-2'>{my_order.orderAction}</span>
                                          </div>
                                        </td>
                                        <td className="px-6 py-4">
                                          <Link href={"/buyer/orders"}><span className='text-blue-500'>View Orders</span></Link>
                                        </td>
                                      </tr>
                                    )
                                  })}
                                </tbody>
                              </table>
                            </div>
                            <div className='pt-6 pb-6'>
                              <hr />
                            </div>

                          </div> : ""}
                        </div>
                        <div className='px-3'>

                          <Form
                            name="basic"

                            style={{ maxWidth: "100%" }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                          >

                            <div className=''>
                              <div className='flex items-center'>
                                <div className='text-lg mr-2'>Place Order</div>
                                <div className='text-sm '>({total_orders} Orders Placed)</div>
                              </div>
                              <div>
                              </div>
                              <div className='mt-3'>

                                <div className='flex flex-row mt-2 justify-start'>

                                  <div style={{ width: "150px" }} className='mr-2'>
                                    <div>Quantity</div>
                                    <Form.Item
                                      name="amount_order"

                                      rules={[{ required: true, message: 'Order Quantity is Required' }]}
                                    >
                                      <Input
                                        disabled={is_saved}
                                        style={{ width: "100%" }}
                                        placeholder='Order Quantity'
                                        type='number'
                                        min={0}
                                        value={""}
                                        onChange={(e) => {
                                          setOrderWeight(parseInt(e.target.value as string))
                                        }}
                                      />
                                    </Form.Item>
                                  </div>
                                  <div className='mr-2'>
                                    <div>Units</div>

                                    <Form.Item
                                      name="order_weightUnits"
                                      rules={[{ required: true, message: 'Select Weight Units' }]}
                                    >
                                      <Select
                                        disabled={is_saved}

                                        placeholder='Measure Unit'

                                        style={{ width: "150px" }}
                                        onChange={e => {
                                          // setSelectedWeightUnit(e)
                                          setOrderWeightUnits(e)
                                        }}
                                      >
                                        {weight_units.map(unit_str => {
                                          return (
                                            <Select.Option key={unit_str} value={`${unit_str}`}>{unit_str}</Select.Option>
                                          )
                                        })}
                                      </Select>
                                    </Form.Item>
                                  </div>
                                </div>
                                <div>
                                  <div>Write note for the seller</div>

                                  <Form.Item
                                    name="buyernote"
                                    rules={[{ required: true, message: 'Write a note for the seller' }]}
                                  >
                                    <TextArea
                                      disabled={is_saved}

                                      showCount
                                      maxLength={500}

                                      style={{ height: 120, marginBottom: 24 }}
                                      onChange={(e) => {
                                        setNote(e.target.value)
                                      }}
                                      placeholder="Write note for the seller"
                                    />
                                  </Form.Item>
                                </div>
                                {product?.User.id === user.id ?
                                  <div className='flex items-center'>
                                    <Button disabled size='large' className='opacity-40'>
                                      <div className='text-white flex items-center'>
                                        <div className='mr-2 text-xl'><ShoppingCartOutlined /></div>
                                        <div>Place Order</div>
                                      </div>
                                    </Button>

                                    <div className='ml-2 flex items-center'>
                                      <div className='text-lg text-red-500'>
                                        <ExclamationCircleOutlined />
                                      </div>
                                      <div className='ml-2'>
                                        You cannot place order on your own product!
                                      </div>

                                    </div>
                                  </div>
                                  :

                                  <div className={`flex items-center`}>

                                    <div className={`${orders.length >= ordering_limit ? "opacity-30" : ""}`}>

                                      <Button
                                        size='large'
                                        htmlType="submit"
                                        disabled={is_saved || orders.length >= ordering_limit}
                                        className={`${is_saved ? "opacity-40" : ""}`}
                                      >
                                        <div className={`text-white flex items-center `}>
                                          <div className='mr-2 text-xl'><ShoppingCartOutlined /></div>
                                          <div>Place Order</div>
                                        </div>
                                      </Button>
                                    </div>
                                    <div className='ml-3 text-md text-red-500'>
                                      {orders.length >= ordering_limit ? <div>
                                        You cannot place more orders on this product. Your ordering limit on this product has reached.
                                      </div> : ""}
                                    </div>
                                    <div className='ml-5'>
                                      {is_saving ?
                                        <div className='flex'>
                                          <Spin />
                                          <span className='text-sm ml-2'>Please wait...</span>
                                        </div>
                                        : ""}
                                      {is_saved ? <div className='flex items-center'>
                                        <div className='text-xl text-green-500'>
                                          <CheckCircleOutlined />
                                        </div>
                                        <div className='ml-2'>Your order is sent to seller!</div>
                                      </div> : ""}
                                    </div>
                                  </div>

                                }

                              </div>
                            </div>

                          </Form>
                        </div>
                      </div>
                    }



                    <div className='border mt-6 pb-6'>

                      <div
                        className='text-lg mb-5 text-center bg-slate-100 p-2'
                      >Contact {product?.User?.name}</div>

                      {user?.id === undefined ?
                        <div className='flex justify-center flex-wrap'>
                          <div className='ml-4 mb-4 md:mb-0'>
                            <div className='ml-3 text-sm'>Phone Call</div>
                            <div className='relative ml-0 ' style={{ width: "180px" }}>


                              <Link href={`/signin`}>
                                <div className='text-white text-2xl cursor-pointer rounded-full bg-yellow-500 flex justify-center items-center absolute'
                                  style={{ right: "-10px", top: "-8px", width: "50px", height: "50px" }}>
                                  <PhoneOutlined />
                                </div>
                                <div className='cursor-pointer bg-blue-500 text-white text-left text-sm p-1 rounded-l-full shadow-md hover:bg-green-700 transition-all' style={{ width: "155px" }}>
                                  <div className='py-1 w-full text-center text-xs'>Login to Call</div>
                                </div>
                              </Link>
                            </div>
                          </div>
                          <div className='ml-4'>
                            <div className='ml-3 text-sm'>WhatsApp</div>
                            <div className='relative ml-0 ' style={{ width: "180px" }}>


                              <Link href={`/signin`}>
                                <div className='text-white text-2xl cursor-pointer rounded-full bg-green-500 flex justify-center items-center absolute'
                                  style={{ right: "-10px", top: "-8px", width: "50px", height: "50px" }}>
                                  <WhatsAppOutlined />
                                </div>
                                <div className='cursor-pointer bg-blue-500 text-white text-left text-sm p-1 rounded-l-full shadow-md hover:bg-green-700 transition-all' style={{ width: "155px" }}>
                                  <div className='py-1 w-full text-center text-xs'>Login to WhatsApp</div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                        :
                        <div className='flex justify-center flex-wrap '>
                          <div className='ml-4 mb-4 md:mb-0'>
                            <div className='ml-3 text-sm'>Phone Call</div>
                            <div className='relative ml-0 ' style={{ width: "180px" }}>
                              <a href={`tel:${product?.User?.phone1}`}>

                                <div className='text-white text-2xl cursor-pointer rounded-full bg-yellow-500 flex justify-center items-center absolute'
                                  style={{ right: "-10px", top: "-8px", width: "50px", height: "50px" }}>
                                  <PhoneOutlined />
                                </div>
                                {/* <Link href={`tel:${product?.User?.phone1}`}> */}
                                <div className='cursor-pointer bg-blue-500 text-white text-left text-sm p-1 rounded-l-full shadow-md hover:bg-green-700 transition-all' style={{ width: "155px" }}>
                                  <div className='py-1 w-full text-center'>{product?.User?.phone1}</div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className='ml-4 px-3'>
                            <div className='ml-3 text-sm'>WhatsApp</div>
                            <div className='relative ml-0 ' style={{ width: "180px" }}>


                              <Link target='_blank' href={`//api.whatsapp.com/send?phone=${product?.User?.phone2}&text=${'hi there'}`}>
                                <div className='text-white text-2xl cursor-pointer rounded-full bg-green-500 flex justify-center items-center absolute'
                                  style={{ right: "-10px", top: "-8px", width: "50px", height: "50px" }}>
                                  <WhatsAppOutlined />
                                </div>
                                <div className='cursor-pointer bg-blue-500 text-white text-left text-sm p-1 rounded-l-full shadow-md hover:bg-green-700 transition-all' style={{ width: "155px" }}>
                                  <div className='py-1 w-full text-center'>{product?.User?.phone2}</div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      }


                    </div>



                    <div className='flex flex-wrap items-center align-middle mt-5 mb-3 px-3'>
                      <p className=' mr-2'>Sold by:</p>

                      <Link href={`/profile/${product?.User.id}`}>
                        <span className='ml-0 md:ml-0 text-blue-500 mr-2'>{product?.User.name}</span>
                      </Link>
                    </div>
                    <div className='flex flex-wrap text-sm px-3 mb-3'>
                      <div>
                        {product?.Category?.name}
                      </div>
                      <div className=''>
                        &nbsp;is available for sale in&nbsp;
                      </div>

                      {getCitiesString(product?.productCity)}

                    </div>


                    {product?.rating.length > 0 ?
                      <div className=' text-sm px-3'>

                        <div className='text-lg'>

                          <div className='flex sm:flex-wrap items-center align-middle'>
                            <div className='mr-2' id='reviews'>Reviews</div>

                            <Rate allowHalf disabled defaultValue={getAverageOfStars(product?.rating as [])} />
                            <div className='flex ml-2 text-sm'>
                              <div className='text-blue-500'>
                                {product?.rating.length} Reviews
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='pt-3'>
                          <ProductRatings params={{ product_id: product?.id }} />
                        </div>
                      </div>
                      : ""
                    }



                  </div>
                </div>
              :
              <div>
                No product found. Go to <a href='/'><span className='text-blue-500'>www.g1trade.com</span></a> to search more products.
              </div>
            :
            <div className='flex p-3 md:p-0'>
              <div className=''>
                <Spin />
              </div>
              <div className='ml-2'>loading...</div>
            </div>
          }
        </section>

      </div >

    </div >
  )
}



