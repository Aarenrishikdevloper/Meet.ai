'use client';
import { auth } from '@/lib/auth'
import AgentHeader from '@/modules/agents/ui/componets/AgentHeader'

import { getQueryClient } from '@/trpc/server'
import { useQuery } from '@tanstack/react-query';
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const page = () => {
 
  
  return (
    <>
     <AgentHeader/> 
     <p>hello world</p>
    </>
  )
}

export default page