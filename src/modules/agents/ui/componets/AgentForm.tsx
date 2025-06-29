'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { agentInsertSchema } from '../../schema/schema';
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
import { Textarea } from '@/components/ui/textarea';

import {trpc} from "@/trpc/client"
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { error } from 'console';
import { toast } from 'sonner';

interface AgentProps {
    onSucess?: () => void
    OnCancel?: () => void;
    intialAgents?: "agentOne"
}
export const AgentForm = ({ onSucess, OnCancel, intialAgents }: AgentProps) => {
    const [loading, setloading] = useState(false)
    const createAgent = trpc.agents.create.useMutation({
     onMutate:()=>{
        setloading(true)
     },
        //todo limiting Free itre usage
        onSuccess:()=>{
            //ToDo:Invalidating the data  
            onSucess?.()
            setloading(false)
        }, 
        onError:(error)=>{ 
            setloading(false)
            console.log(error) 
            toast.error("Something went wrong")

        }
    }) 
    const onSubmit =(values:z.infer<typeof agentInsertSchema>)=>{
        createAgent.mutate(values)
    }
   
    const form = useForm<z.infer<typeof agentInsertSchema>>({
        resolver: zodResolver(agentInsertSchema),
        defaultValues: {
            name: "",
            instruction: ""


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
                        <Button variant={"ghost"} type='button' onClick={OnCancel} disabled={loading} >
                            Cancel
                        </Button> 
                    
                    )} 
                    <Button type='submit' disabled={loading}> 
                        Create

                    </Button>
                 </div>
            </form>
        </Form>
    )
}
