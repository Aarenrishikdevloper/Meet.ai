'use client'
import { DataTable } from '@/components/datatable'
import ErrorSate from '@/components/ErrorSate'
import LoadingSate from '@/components/LoadingSate'
import { useTRPC } from '@/trpc/client'
import {  useMutation, useQueryClient, useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query'
import { collectSegments } from 'next/dist/build/segment-config/app/app-segments'
import React, { useState } from 'react'
import { columns } from '../componets/Column'
import { useRouter } from 'next/navigation'
import Emptystate from '@/components/Emptystate'
import { useAgentsFilter } from '../../hooks/use-agents-filter'
import AgentViewheader from '../componets/AgentViewheader'
import Generateavatar from '@/components/Generate-avatar'
import { Badge } from '@/components/ui/badge'
import { VideoIcon } from 'lucide-react'
import { toast } from 'sonner'
import { useConfirm } from '@/hooks/use-conirm'
import UpdateAgentDialog from '../componets/UpdateDialog'


const AgentIdView = ({agentId}:{agentId:string}) => {
  const trpc = useTRPC() 
  const [dialogOpen, setDialogOpen] = useState(false)
  const queryClient = useQueryClient()
  const {data} = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({id:agentId})
  )
  const router = useRouter()
  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess:async()=>{
        await queryClient.invalidateQueries(
          trpc.agents.getAll.queryOptions({})
        )
        router.push('/agents')
      }, 
      onError:(error)=>{
        toast.error(error.message)
      }
    })
  )
  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure?", 
    `The Following action will remove  3 associated meeting`
  )
  const handleRemoveAgent =async()=>{
    const ok = await confirmRemove() 
    if(!ok) return  
    await removeAgent.mutateAsync({id:agentId})
  }
  return (
    <> 
    <RemoveConfirmation/>
    <UpdateAgentDialog  
        open={dialogOpen}   
        onOpenchange={setDialogOpen}  
        intialValues={data}

    />
      <div className="flex-1 py-4 md:px-8 flex flex-col gap-y-8">
         <AgentViewheader agentId={agentId} agentname={data.name} onRemove={handleRemoveAgent} onEdit={()=>setDialogOpen(true)}/>
         <div className="bg-white rounded-lg border">
          <div className="px-4 py-5 gap-y-5  flex flex-col col-span-5">
            <div className="flex items-center gap-x-3">
              <Generateavatar  
                 seed={data.name} 
                 variant={'bottsNeutral'}   
                 classname='size-10'
              />
              <h2 className='text-2xl font-medium'>{data.name}</h2>
            </div>
            < Badge variant={"outline"} className='flex items-center gap-x-2 [&>svg]:size-4'> 
             <VideoIcon className='text-blue-700'/>   
               1 meeting

            </Badge>
            <div className="flex flex-col gap-y-4">
              <p className='text-lg  font-medium'>
                Instruction
              </p>
              <p  className='text-neutral-800'>
                {data.instructions}
              </p>
            </div>
          </div>
         </div>
      </div>
    </>
  )
}

export default AgentIdView  

export const AgentIdViewLoading =()=>{
  return(
    <LoadingSate  
      title='Loading Agents'  
      description='This may take few moments'
    /> 
  )
}
export const AgentIdViewError=()=>{
  return(
    <ErrorSate title='Something  Went Wrong ' description='Please Try Again'/> 
  )
}