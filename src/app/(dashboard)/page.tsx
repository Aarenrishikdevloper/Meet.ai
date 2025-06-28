import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import React from 'react'
import Buttons from '@/components/button'

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
      <Buttons/>
      </div>
  )
}

export default page