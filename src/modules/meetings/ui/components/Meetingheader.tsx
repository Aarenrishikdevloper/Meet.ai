'use client'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import React, { useState } from 'react'
import NewMeetingDialog from './NewMeetingDialog'

const Meetingheader = () => {
     const [isDialogOpen, setisDialogOpen] = useState(false)
  return (
    <>
    <NewMeetingDialog open={isDialogOpen} onOpenchange={setisDialogOpen}/>
    <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
            <h5 className='font-medium text-xl'>My Meetings</h5> 
            <Button onClick={()=>setisDialogOpen(true)}>
                <PlusIcon /> 
                New Meeting
            </Button>
        </div>
        
     </div>
     </>
  )
}

export default Meetingheader