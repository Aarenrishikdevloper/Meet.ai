import ResponsiveDialog from '@/components/ResponsiveDialog'
import React from 'react'
import { boolean } from 'zod'
import { AgentForm } from './AgentForm'
import { AgentGetOne } from '../../types/type'
interface props{
    open:boolean,  
    onOpenchange:(open:boolean)=>void, 
    intialValues:AgentGetOne
}
const UpdateAgentDialog = ({open, onOpenchange, intialValues}:props) => {
  return (
    <ResponsiveDialog 
      title='Eit Agent' 
      description='Edit the  agent details'  
      open={open} 
      onOpenChange={onOpenchange}
    >
     <AgentForm onSucess={()=>onOpenchange(false)} OnCancel={()=>onOpenchange(false)} intialAgents={intialValues}/>
    </ResponsiveDialog>
  )
}

export default UpdateAgentDialog