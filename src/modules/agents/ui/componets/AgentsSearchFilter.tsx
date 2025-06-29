import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import React from 'react'

const AgentsSearchFilter = () => {
  return (
    <div className=' relative'> 
    <Input 
       placeholder='Filter by name' 
       className='h-9 bg-white w-[200px] pl-7'
    /> 
    <SearchIcon className=' size-4  absolute  left-2 top-1/2  -translate-y-1/2  text-muted-foreground'/>

    </div>
  )
}

export default AgentsSearchFilter