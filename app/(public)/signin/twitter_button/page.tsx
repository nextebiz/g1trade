'use client'
import { Button } from 'antd'
import React from 'react'
import "antd/lib/style/index"
import { TwitterSquareFilled } from '@ant-design/icons';
import { signIn } from 'next-auth/react';

type ProviderType = {
  id: string,
  name: string,
  type: string,
  signinUrl: string,
  callbackUrl: string
}

interface Props {
  params: {
    provider: ProviderType
  }
}
export default function TwitterSigninButton({ params: { provider } }: Props) {
  return (
    <div >
      <Button
        onClick={() => {
          signIn(provider.id, { callbackUrl: "/signin/signin_action" }).then((res) => {
            console.log(res)
           })
        }}
        type='primary'
        className='twitter_btn'
        style={{ height: "50px" }}
      >
        <div className='flex flex-row align-middle justify-center items-center text-xl'>
          <TwitterSquareFilled className='mr-2 text-2xl' />
          <span>
            Sign in with Twitter
          </span>
        </div>
      </Button>
    </div>
  )
}
