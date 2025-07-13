'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { agentInsertSchema } from '../../schema/schema';
import Generateavatar from '@/components/Generate-avatar';

import {
    Form,
    FormControl,
   
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { z } from "zod"
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';


import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';
import { useTRPC } from '@/trpc/client';
import { AgentGetOne } from '../../types/type';

interface AgentProps {
    onSucess?: () => void
    OnCancel?: () => void;
    intialAgents?: AgentGetOne
}
export const AgentForm = ({ onSucess, OnCancel, intialAgents }: AgentProps) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient()   

   
    const createAgent = useMutation(
        trpc.agents.create.mutationOptions({
            onSuccess:async()=>{
                await queryClient.invalidateQueries(
                    trpc.agents.getAll.queryOptions({})
                )
                onSucess?.()
            }, 
            onError:()=>{
                toast.success("Something went wrong")
            }
        }), 
        
    )
    const isEdit = !!intialAgents?.id 
    const updateAgent = useMutation(
        trpc.agents.update.mutationOptions({
            onSuccess:async()=>{
                await queryClient.invalidateQueries(
                    trpc.agents.getAll.queryOptions({})
                )
                if(intialAgents?.id){
                    await queryClient.invalidateQueries(
                        trpc.agents.getOne.queryOptions({id:intialAgents.id})
                    )
                }
                onSucess?.()
            }, 
            onError:(error)=>{
                console.log(error)
               toast.error("Something went wrong")
            }
        })
    )
    const onSubmit =(values:z.infer<typeof agentInsertSchema>)=>{
        if(isEdit){
           updateAgent.mutate({...values, id:intialAgents.id})
        }else{
            createAgent.mutate(values)  
        }

        
    }
    const pending = createAgent.isPending || updateAgent.isPending
    const form = useForm<z.infer<typeof agentInsertSchema>>({
        resolver: zodResolver(agentInsertSchema),
        defaultValues: {
            name:intialAgents?.name ?? "",
            instruction:intialAgents?.instructions ?? ""


        },
    })
     
    return (
        <Form {...form}>
            <form className=' space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                <Generateavatar
                    seed={form.watch("name")}
                    variant={'bottsNeutral'}
                    classname='border size-16'
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="eg. Math tutor" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="instruction"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Instruction</FormLabel>
                            <FormControl>
                                <Textarea  placeholder="You are a helpful math assistant that can answer questions and helps with assignments" {...field} />
                            </FormControl>

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
                    <Button type='submit' disabled={pending}> 
                        {isEdit ? "Update":"Create"}

                    </Button>
                 </div>
            </form>
        </Form>
    )
}
