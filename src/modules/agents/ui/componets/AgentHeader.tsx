'use client'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { PlusIcon } from 'lucide-react'
import React, { useState } from 'react'
import AgentsSearchFilter from './AgentsSearchFilter'
import NewAgentDialog from './NewAgentDialog'

const AgentHeader = () => {
  const [isDialogOpen, setisDialogOpen] = useState(false)
  return (
    <>
    <NewAgentDialog  open={isDialogOpen} onOpenchange={setisDialogOpen}/>
     <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
            <h5 className='font-medium text-xl'>My Agents</h5> 
            <Button onClick={()=>setisDialogOpen(true)}>
                <PlusIcon /> 
                New Agent
            </Button>
        </div>
        <ScrollArea>
          <div className=" flex items-center gap-x-2  p-1">
            <AgentsSearchFilter/>

          </div>
          <ScrollBar orientation={"horizontal"}/>
        </ScrollArea>
     </div>
    </>
  )
}

export default AgentHeader