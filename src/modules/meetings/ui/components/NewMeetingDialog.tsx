import ResponsiveDialog from '@/components/ResponsiveDialog'
import React from 'react'
import { MeetingForm } from './MettingsForm'
import { useRouter } from 'next/navigation'


interface props{
    open:boolean,  
    onOpenchange:(open:boolean)=>void
}
const NewMeetingDialog = ({open, onOpenchange}:props) => {
  const router = useRouter()
  return (
    <ResponsiveDialog 
      title='New Agent' 
      description='Create a new Meeting'  
      open={open} 
      onOpenChange={onOpenchange}
    >
     <MeetingForm onSucess={(id)=>{
      onOpenchange(false) 
      router.push(`meetinggs/${id}`)
     }} OnCancel={()=>onOpenchange(false)}/>
    </ResponsiveDialog>
  )
}

export default NewMeetingDialog