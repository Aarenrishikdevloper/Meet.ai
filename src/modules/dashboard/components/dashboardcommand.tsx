import { CommandResponsiveDialog, CommandInput, CommandItem } from '@/components/ui/command';
import { CommandList } from 'cmdk';

import React, { Dispatch, SetStateAction } from 'react'
type props ={
    open:boolean; 
    setOpen:Dispatch<SetStateAction<boolean>>
}
const Dashboardcommand = ({open,setOpen}:props) => {
  return (
    <CommandResponsiveDialog open={open} onOpenChange={setOpen}> 
    <CommandInput placeholder='Find a meeting for agent'/> 
    <CommandList>
        <CommandItem>
            Test
        </CommandItem>
    </CommandList>

    </CommandResponsiveDialog>
  )
}

export default Dashboardcommand