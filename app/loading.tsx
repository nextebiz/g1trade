import React from 'react'
import { Spin } from 'antd';


export default function Loading() {
  return (
    <div className='' style={{ width: "100%" }}>
      {/* <div style={{ height: "60px" }} className='bg-slate-700 flex items-center'>

        <div style={{ paddingLeft: "45px" }}>
          ...
        </div>
      </div> */}
      <div className='text-black bg-white' style={{ minHeight: "400px" }}>
        <section>
          <div className='p-5 flex' >
            <Spin />
            <div className='ml-4 text-sm text-black'>Loading...</div>
          </div>
        </section>
      </div>
    </div>
  )
}
