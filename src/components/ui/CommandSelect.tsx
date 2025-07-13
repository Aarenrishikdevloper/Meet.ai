import React, { ReactNode, useState } from 'react'
import { Button } from './button';
import { cn } from '@/lib/utils';
import { ChevronDownIcon } from 'lucide-react';
import { CommandEmpty, CommandInput, CommandItem, CommandList, CommandResponsiveDialog } from './command';
interface CommandSelect {
    options : Array<{
        id:string, 
        value:string,
        children:ReactNode
        
    }>;
    onSelect:(value:string)=>void; 
    onsearch:(value:string)=>void; 
    value:string; 
    placeholder:string; 
    issearchable?:boolean; 
    className?:string;
}
const CommandSelect = ({onSelect,options,value, className, onsearch, placeholder="Select an option"}:CommandSelect) => {
    const [open, setOpen] = useState(false)   
    const selectedOpion = options.find((option)=>option.value === value) 
    const handleValueChange =(open:boolean)=>{
        onsearch?.("")  
        setOpen(open)     
    }
  return (
    <>
     <Button 
        type={"button"}  
        variant={'outline'}   
        className={cn("h-9  justify-between font-normal px-2", !selectedOpion && "text-muted-foreground", className)}  
        onClick={()=>setOpen(true)}
     >
       <div>
         {selectedOpion?.children ?? placeholder}  
        
       </div>
        <ChevronDownIcon/>
     </Button>
     <CommandResponsiveDialog shouldFilter={!onsearch} open={open} onOpenChange={handleValueChange}> 
          <CommandInput placeholder='search...' onValueChange={onsearch}/>    
          <CommandList>
            <CommandEmpty>
                <span className='text-muted-foreground text-sm'>
                    No Options found
                </span>
            </CommandEmpty> 
           {options.map((option)=>{
            return(
                <CommandItem key={option.id} onSelect={()=>{
                    onSelect(option.value)   
                    setOpen(false)
                }}> 
                    {option.children}

                </CommandItem>
            )
           })}
          </CommandList>

     </CommandResponsiveDialog>
    </>
  )
}

export default CommandSelect