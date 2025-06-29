'use client';
import { Separator } from '@/components/ui/separator'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenuButton } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { BotIcon, StarIcon, VideoIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import DashboardUserButton from './DashboardUserButton';
import { useIsMobile } from '@/hooks/use-mobile';


const DashboardSidebar = () => {
    const firstSection =[
        {
            icon:VideoIcon,  
            label:"Mettings", 
            href:"/meetings"

        },  
         {
            icon:BotIcon,  
            label:"Agents", 
            href:"/agents"

        }, 

    ]
    const secoundSection =[
         {
            icon:StarIcon,  
            label:"Upgrade", 
            href:"/upgrade"

        }, 

    ]
    const pathname = usePathname()
   
  return (
    <Sidebar>
        <SidebarHeader className='text-sidebar-accent-foreground '> 
            <Link href={"/"} className='flex items-center gap-0 px-2 pt-2'> 
            <Image src={"/logo.svg"} height={36} width={36} alt='Meet Ai'/> 
             <p className='text-2xl font-semibold'>
                Meet.AI
             </p>
            </Link>

        </SidebarHeader>
        <div className="px-4 py-2">
            <Separator className='opacity-10 text-[#5d6B68]'/>
        </div>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupContent>
                    {firstSection.map((item,index)=>(
                        <SidebarMenuButton key={index} asChild className={cn("h-10 hover:bg-linear-to-r/oklch border border-transparent  hover:border-[#5D6B68]/10  from-sidebar-accent  from-5% via-sidebar/50 to-sidebar/50",  
                            pathname  === item.href && 'bg-linear-to-r/oklch  border-[#5D6b68]/10'
                        )}
                        isActive={pathname === item.href}
                        >
                         <Link href={item.href}>
                           <item.icon className=' size-5'/> 
                           <span className='text-sm font-medium tracking-tight'>
                            {item.label}
                           </span>
                         </Link>
                        </SidebarMenuButton>
                    ))}
                </SidebarGroupContent>
            </SidebarGroup>
            <div className="px-4 py-2">
            <Separator className='opacity-10 text-[#5d6B68]'/>
        </div>
         <SidebarGroup>
                <SidebarGroupContent>
                    {secoundSection.map((item,index)=>(
                        <SidebarMenuButton key={index} asChild className={cn("h-10 hover:bg-linear-to-r/oklch border border-transparent  hover:border-[#5D6B68]/10  from-sidebar-accent  from-5% via-sidebar/50 to-sidebar/50",  
                            pathname  === item.href && 'bg-linear-to-r/oklch  border-[#5D6b68]/10'
                        )}
                        isActive={pathname === item.href}
                        >
                         <Link href={item.href}>
                           <item.icon className=' size-5'/> 
                           <span className='text-sm font-medium tracking-tight'>
                            {item.label}
                           </span>
                         </Link>
                        </SidebarMenuButton>
                    ))}
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className='text-white'> 
            <DashboardUserButton/>

        </SidebarFooter>
    </Sidebar>
  ) 
}

export default DashboardSidebar