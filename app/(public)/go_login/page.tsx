'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function GoLogin() {
  const router = useRouter();
  useEffect(() => {
    router.push("/signin")
  }, [])
  return (
    <div className='bg-white text-black flex items-center justify-center' style={{ minHeight: "400px" }}>
      <span>You are not logged in. </span>
      <Link href={'/signin'}><span className='text-blue-500 mx-1'>Click here</span></Link> to sign in.
    </div>
  )
}
