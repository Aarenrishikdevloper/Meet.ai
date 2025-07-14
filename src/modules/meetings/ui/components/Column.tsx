'use client'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import Generateavatar from '@/components/Generate-avatar'
import {  CircleCheckIcon, CircleXIcon, ClockArrowUpIcon, ClockFadingIcon, CornerDownRightIcon, LoaderIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { MeetingGetMany } from '../../type/type'
import {format} from "date-fns"
import { cn, formatDuration } from '@/lib/utils'
const statusIconMap = {
  upcoming: ClockArrowUpIcon,
  active: LoaderIcon,
  completed: CircleCheckIcon,
  processing: LoaderIcon,
  canceled: CircleXIcon, // changed from "cancelled" to "canceled"
};

const statusColorMap = {
  upcoming: "bg-yellow-500/20 text-yellow-800 border-yellow-800/5",
  active: "bg-blue-500/20 text-blue-800 border-blue-800/5",
  completed: "bg-emerald-500/20 text-emerald-800 border-emerald-800/5",
  processing: "bg-gray-300/20 text-gray-800 border-gray-800/5",
  canceled: "bg-rose-500/20 text-rose-800 border-rose-800/5", // changed from "cancelled" to "canceled"
};
export const columns:ColumnDef<MeetingGetMany[number]>[] = [
    {
        accessorKey:"name", 
        header:"Meeting Name", 
        cell:({row})=>(
            <div className="flex flex-col gap-y-1">
                <span className='font-semibold capitalize'>   
                     {row.original.name}

                </span>    
                <div className='flex items-center gap-x-2 '>
                <div className="flex items-center gap-x-1">
                    <CornerDownRightIcon className='size-3 text-muted-foreground'/>  
                    <span>
                        {row.original.agent.name}
                    </span>
                </div> 
                <Generateavatar     
                   variant={"bottsNeutral"}  
                   seed={row.original.agent.name}  
                   classname=' size-4'
                 />
              <span className='text-sm text-muted-foreground'> 
                 {row.original.startedAt ? format(row.original.startedAt, "MM d"):" " }

              </span>
            </div>
            </div>
        )
    }, 
    {
        accessorKey:"status", 
        cell:({row})=>{
            const Icon = statusIconMap[row.original.status as keyof typeof statusIconMap]   
            return(
                <Badge variant={'outline'} className={cn(' capitalize [&>svg]:size-4 text-muted-foreground',
                    statusColorMap[row.original.status as keyof typeof statusColorMap]
                )}>    
                   <Icon className={cn(row.original.status === "processing" && "animate-spin")}/>     
                   {row.original.status} 
                </Badge>
            )
        }
        
    }, 
    {
        accessorKey:"duration", 
        header:"Duration", 
        cell:({row})=>(
              <Badge className='capitalize [&>svg]:size-4  flex items-center gap-x-2  ' variant={'outline'}>     
                 <ClockFadingIcon className='text-blue-700'/> 
                   {row.original.duration !== null ? formatDuration(row.original.duration):"No duration" }

              </Badge>
        )
    }
  
]
