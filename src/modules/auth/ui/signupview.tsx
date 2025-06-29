'use client';
import { Card, CardContent } from '@/components/ui/card'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import {FaGithub, FaGoogle} from "react-icons/fa"
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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { error } from 'console';
const formSchema = z.object({
    name: z.string().min(1, { message: "Name Is required" }),
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be 8 chracters" }),
    confirmPassword: z.string().min(8, { message: "Password must be 8 chracters" }),
}).refine((data)=>data.password === data.confirmPassword,{
    message:"Password do not match", 
    path:["confirmPassword"]
})
const SignupView = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: '',
            password: '',
            confirmPassword: ""
        },
    })
    const router = useRouter() 
    const [pending, setpending] = useState(false)   
    const onSubmit =(data:z.infer<typeof formSchema>)=>{ 
        setpending(true)  
        authClient.signUp.email({
            name:data.name, 
            email:data.email, 
            password:data.password
        },
        {
            onSuccess:()=>{
                router.push('/')
                setpending(false) 
            }, 
            onError:({error})=>{
                console.log(error) 
                setpending(false)
            }

        }
    )


    }
    return (
        <div className='flex flex-col gap-6'>
            <Card className=' overflow-hidden p-0'>
                <CardContent className='grid p-0 md:grid-cols-2'>
                    <Form {...form}>
                        <form className='p-6 mb:p-8'  onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className='text-2xl font-bold'>
                                        Let&apos;s get started

                                    </h1>
                                    <p className=' text-muted-foreground text-balance'>Create your account</p>
                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John Doe" {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    </div>
                                     <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="you@example.com" {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    </div>
                                     <div className="grid gap-3">
                                     <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="******"  type='password' {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    /> 
                                    </div>
                                     <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Confirm Password</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="******" type='password' {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    
                                    

                                </div>
                                <Button type={'submit'} className='w-full' disabled={pending}>
                                    Sign up
                                </Button>
                                <div className="afer:border-border relative text-center text-sm  after:absolute  after:inset-0  after:top-1/2 after:z-0 after:flex after:items-center after:border-t "> 
                                   <span className=' bg-card text-muted-foreground relative z-10 px-2'> 
                                    Or continue with

                                   </span>
                                </div>
                                <div className=" grid grid-cols-2 gap-4">
                                    <Button variant={'outline'} type={'button'} className='w-full' 
                                      onClick={()=>{
                                        authClient.signIn.social({
                                            provider:"github", 
                                            callbackURL:'/'
                                        })
                                      }}
                                    > 
                                         <FaGithub/>

                                    </Button> 
                                    <Button variant={'outline'} type={'button'} className='w-full' 
                                      onClick={()=>{
                                        authClient.signIn.social({
                                            provider:'google', 
                                            callbackURL:"/"
                                        })
                                      }}
                                    > 
                                         <FaGoogle/>

                                    </Button>
                                </div>
                                  <div className="text-center text-sm">
                                   Alreay have an account?<Link href={'/sign-in'} className='underline underline-offset-4'> Sign in</Link>
                                </div>
                            </div>
                        </form>

                    </Form>
                    <div className=" bg-radial from-sidebar-accent to-sidebar relative hidden md:flex flex-col gap-y-4 items-center justify-center">
                        <img src={'/logo.svg'} alt='' className='h-[92px] w-[92px]'/> 
                        <p className='text-2xl font-semibold text-white'>Meet.AI</p>
                    </div> 

                </CardContent>
            </Card>
             <div className=" text-muted-foreground *:[a]:hover:text-primary  text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
                By Clicking your agree to our <a>Term of service</a> and <a>Privacy policy</a>
            </div>

        </div>
    )
}

export default SignupView