import { auth } from '@/lib/auth'
import Meetingheader from '@/modules/meetings/ui/components/Meetingheader'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import React, { Suspense } from 'react'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import MeetingView, { MeetingViewError, MeetingViewLoading } from '@/modules/meetings/ui/views/MeetingView'
import { ErrorBoundary } from 'react-error-boundary'

const page = async() => {
  const session = await auth.api.getSession({
     headers:await headers()
  }) 
  if(!session){
    redirect('/sign-in')
  }
   const queryclient = getQueryClient()   
   void queryclient.prefetchQuery(
    trpc.meettings.getAll.queryOptions({})
   )
  return (
  <> 
     <Meetingheader/>    
     <HydrationBoundary state={dehydrate(queryclient)}>     
        <Suspense fallback={<MeetingViewLoading/>}> 
           <ErrorBoundary fallback={<MeetingViewError/>}>   
              <MeetingView/>

           </ErrorBoundary>
        </Suspense>

     </HydrationBoundary>
  </>
  )
}

export default page