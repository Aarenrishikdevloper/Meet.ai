'use client';
import React from 'react'
import {ColumnDef, flexRender, getCoreRowModel, useReactTable} from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableRow } from './ui/table';
interface DataTabelProps<TData, Tvalue>{
   columns:ColumnDef<TData,Tvalue>[]; 
   data:TData[], 
   onRowClick:(row:TData)=>void; 
}

export function DataTable<TData,Tvalue>({data,columns,onRowClick}:DataTabelProps<TData,Tvalue>){
    const table = useReactTable({
        data, 
        columns, 
        getCoreRowModel:getCoreRowModel()
    }) 
    return(
        <div className=" rounded-lg  border bg-background overflow-hidden">
            <Table>
                <TableBody>
                {table.getRowModel().rows?.length?(
                    table.getRowModel().rows.map((row)=>(  
                        <TableRow  key={row.id}  className='cursor-pointer' data-state={row.getIsSelected()&& "selected"}>
                           {row.getVisibleCells().map((cell)=>(
                            <TableCell key={cell.id} className='text-sm p-4'>  
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                
                            </TableCell>
                           ))}
                        </TableRow>

                    ))
                ):(
                    <TableRow>
                        <TableCell className='h-19 text-center text-muted-foreground'>
                            No agents found
                        </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </div>
    )
}