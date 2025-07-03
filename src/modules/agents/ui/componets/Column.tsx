'use client'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'
import { AgentGetMany } from '../../types/type'
import Generateavatar from '@/components/Generate-avatar'
import {  CornerDownRightIcon, VideoIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export const columns:ColumnDef<AgentGetMany[number]>[] = [
    {
        accessorKey:"name", 
        header:"Agent Name", 
        cell:({row})=>(
            <div className="flex flex-col gap-y-1">
                <div className="flex items-center gap-x-2">
                    <Generateavatar 
                       seed={row.original.name} 
                       variant={'bottsNeutral'} 
                       classname=' size-6'
                    />
                    <span className=' font-semibold capitalize'>
                        {row.original.name}
                    </span>
                </div>
                <div className="flex items-center gap-y-2">
                    <CornerDownRightIcon className='size-3  text-muted-foreground'/> 
                    <span className=' text-sm text-muted-foreground  max-w-[200px]  truncate capitalize'> 
                        {row.original.instructions}

                    </span>
                </div>
            </div>
        )
    }, 
  
]
