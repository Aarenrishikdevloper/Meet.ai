'use client'
import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/ui/sidebar'
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from 'lucide-react'
import React, { useState } from 'react'
import Dashboardcommand from './dashboardcommand'

const DashboardNavbar = () => {
    const {toggleSidebar, state, isMobile} = useSidebar()
    const [commandOpen,  setcommand] = useState(false)
  return (
    <>
    <Dashboardcommand open={commandOpen} setOpen={setcommand}/>
    <nav className='flex px-4 gap-x-2 items-center py-3 border-b bg-background'> 
    <Button className='size-9 ' variant={"outline"} onClick={toggleSidebar} >
         {state === "collapsed" || isMobile ?(
            <PanelLeftIcon className='size-4'/>
         ):(
            <PanelLeftCloseIcon className='size-4'/>
         ) }
    </Button>
    <Button onClick={()=>setcommand(true)} className='h-9  w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground' size={"sm"} variant={"outline"}>  
        <SearchIcon/> 
        Search  
        <kbd className='ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground'> 
            <span className='text-xs'> 
                 &#8984;

            </span>k

        </kbd>


    </Button>
 
    </nav>
    </>
  )
}

export default DashboardNavbar