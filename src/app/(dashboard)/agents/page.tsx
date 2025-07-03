
import { auth } from '@/lib/auth'
import AgentHeader from '@/modules/agents/ui/componets/AgentHeader'
import AgentView, { AgentsViewLoading, AgentViewError } from '@/modules/agents/ui/views/AgentView';
import {ErrorBoundary} from "react-error-boundary"
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary, useQuery } from '@tanstack/react-query';
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'
import { SearchParams } from 'nuqs';
import { loadSearchParams } from '@/modules/agents/params/params';
interface Props {
  searchParams:Promise<SearchParams>;
}

const page = async({searchParams}:Props) => {
   const session = await auth.api.getSession({
       headers:await headers(),
   }) 
   if(!session){
      redirect("/sign-in")
   }
   
  const filters = await loadSearchParams(searchParams) 

 
  
  const queryClient = getQueryClient() 
  void queryClient.prefetchQuery(
    trpc.agents.getAll.queryOptions({...filters})
  )
  return (
    <>
     <AgentHeader/>  
     <HydrationBoundary state={dehydrate(queryClient)}>  
       <Suspense fallback={<AgentsViewLoading/>}> 
       <ErrorBoundary fallback={<AgentViewError/>}>  
          <AgentView/>

       </ErrorBoundary>

       </Suspense>

     </HydrationBoundary>
    
     
    </>
  )
}

export default page