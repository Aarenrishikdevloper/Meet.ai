import ResponsiveDialog from '@/components/ResponsiveDialog'
import React from 'react'
import { boolean } from 'zod'
import { AgentForm } from './AgentForm'
interface props{
    open:boolean,  
    onOpenchange:(open:boolean)=>void
}
const NewAgentDialog = ({open, onOpenchange}:props) => {
  return (
    <ResponsiveDialog 
      title='New Agent' 
      description='Create a new agent'  
      open={open} 
      onOpenChange={onOpenchange}
    >
     <AgentForm onSucess={()=>onOpenchange(false)} OnCancel={()=>onOpenchange(false)}/>
    </ResponsiveDialog>
  )
}

export default NewAgentDialog