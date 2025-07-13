'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { meetingsInsertSchema } from '../../schema/schema';
import Generateavatar from '@/components/Generate-avatar';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { z } from "zod"
import { Input } from '@/components/ui/input';


import { Button } from '@/components/ui/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';
import { useTRPC } from '@/trpc/client';
import CommandSelect from '@/components/ui/CommandSelect';
import NewAgentDialog from '@/modules/agents/ui/componets/NewAgentDialog';
//import { AgentGetOne } from '../../types/type';

interface AgentProps {
    onSucess?: (id?:string) => void
    OnCancel?: () => void;
    intialAgents?: "meetingone"
}
export const MeetingForm = ({ onSucess, OnCancel, intialAgents }: AgentProps) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient()   
    const [openNewagent, setOpenNewagent] = useState(false)  
      const [agentsearch, setAgentsearch] = useState("") 
    
   const agents = useQuery(
    trpc.agents.getAll.queryOptions({
        pageSizes:100, 
        search:agentsearch
    }))
   
    const createMeeting = useMutation(
            trpc.meettings.create.mutationOptions({
                onSuccess:async()=>{
                    //todo:Querty refetching
                    onSucess?.()
                }, 
                onError:()=>{
                    toast.success("Something went wrong")
                }
            }), 
            
        )
        
    
    //const isEdit = !!intialAgents?.id 
    
   const onSubmit =(values:z.infer<typeof meetingsInsertSchema>)=>{
        
            createMeeting.mutate(values)
        

        
    }
    const pending = createMeeting.isPending
    const form = useForm<z.infer<typeof meetingsInsertSchema>>({
        resolver: zodResolver(meetingsInsertSchema),
        defaultValues: {
            name:"",
            agentId: ""


        },
    })
     
    return (
        <>
        <NewAgentDialog open={openNewagent} onOpenchange={setOpenNewagent}/>
        <Form {...form}>
            <form className=' space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
               
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="eg. Math consultations" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />  
                <FormField
                    control={form.control}
                    name="agentId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Agent</FormLabel>
                            <FormControl>
                                <CommandSelect   
                                   options={(agents.data?.items ?? []).map((agent)=>({
                                    id:agent.id, 
                                    value:agent.id, 
                                    children:(
                                        <div className='flex items-center gap-x-2'>  
                                          <Generateavatar  
                                             seed={agent.name}  
                                             variant={'bottsNeutral'}  
                                             classname='border size-6'
                                          />
                                           <span>{agent.name}</span>
                                        </div>
                                    )
                                   }))}   
                                   onSelect={field.onChange} 
                                   onsearch={setAgentsearch} 
                                   value={field.value}    
                                   placeholder='Select an agent'
                                />
                              
                            
                            </FormControl>
                              <FormDescription>
                                    Not what you&apos;re looking for?{" "}   
                                    <button type={'button'} className='text-primary hover:underline' onClick={()=>setOpenNewagent(true)}>
                                        Create an agent
                                    </button>
                                </FormDescription>


                            <FormMessage />
                        </FormItem>
                    )}
                />

                 <div className="flex justify-between gap-x-2">
                    {OnCancel &&(
                        <Button variant={"ghost"} type='button' onClick={OnCancel} disabled={pending} >
                            Cancel
                        </Button> 
                    
                    )} 
                    <Button  type='submit' disabled={pending}> 
                        {"Create"}

                    </Button>
                 </div>
            </form>
        </Form>
        </>
    )
}
