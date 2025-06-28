'use client';
import { authClient } from '@/lib/auth-client'
import React from 'react'
import { Button } from './ui/button';
import { trpc } from '@/trpc/client';

const Buttons = () => {
  const [data] = trpc.hello.useSuspenseQuery({text:"alex"})
  return (
    <>
     <Button onClick={()=>{
         authClient.signOut()
      }}>
        log out 
      </Button>  
      <p>{data.greeting}</p>
      </>
  )
}

export default Buttons