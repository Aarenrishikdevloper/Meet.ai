import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import React from 'react'
import LoadingSate from '@/components/LoadingSate'
import Emptystate from '@/components/Emptystate'


const page = async() => { 
  const session = await auth.api.getSession({
    headers:await headers(),
}) 
if(!session){
   redirect("/sign-in")
}
  return (
    <div>
      page 
     
      </div>
  )
}

export default page