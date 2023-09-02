'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Spin } from 'antd';

export default function SellerHowToUpload() {
  const router = useRouter();
  const [video_link, setVideoLink] = useState("")
  useEffect(() => {
    const getVideo = async () => {
      const fetch_video = await fetch("/api/public/website_settings", {
        method: "POST",
        next: { revalidate: 300 }
      })
      const response_video = await fetch_video.json();
      setVideoLink(response_video.data.how_to_sell_video)
    }
    getVideo()
  }, [])
  return (
    <div className='bg-white text-black  p-5' style={{ minHeight: "400px" }}>

<h1 className='text-2xl '>
        How to List Your G1 Garlic For Sale
      </h1>
      <div className='mb-3 mt-2' >
        Instructions for the Seller
      </div>
      <div className='mb-3 mt-2' >
        <hr />
      </div>
      <div>
        {video_link !== "" ?
          <iframe style={{ border: "0px", minHeight: "450px" }}
            width="100%"
            // height="315"
            src={`${video_link}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen>
          </iframe>
          :
          <div className='flex items-center'>
            <span><Spin /></span>
            <span className='ml-2 '>Loading...</span>
          </div>
        }
      </div>
    </div>
  )
}
