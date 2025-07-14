'use client'
import { DataTable } from '@/components/datatable'
import ErrorSate from '@/components/ErrorSate'
import LoadingSate from '@/components/LoadingSate'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React from 'react'
import { columns } from '../components/Column'

const MeetingView = () => {
  const trpc = useTRPC()  
  const rouer = useRouter()   
  const {data} = useSuspenseQuery(
    trpc.meettings.getAll.queryOptions({})
  )
  return (
    <div className='flex-1 pb-4 md:px-8 flex flex-col gap-y-4'>    
         <DataTable data={data.items} columns={columns} onRowClick={(row)=>rouer.push(`/meetgs/${row.id}`)}/>
    </div>
  )
}

export default MeetingView   

export const MeetingViewLoading = () => {
  return (
    <LoadingSate
      title='Loading Meeting'
      description='This may take few moments'
    />
  )
}
export const MeetingViewError = () => {
  return (
    <ErrorSate title='Something  Went Wrong ' description='Please Try Again' />
  )
}