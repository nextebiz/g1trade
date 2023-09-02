import React from 'react'
import HomePublic from "./(search)/home/page"
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <HomePublic params={{session:session}}/>
    </div>
  )
}
