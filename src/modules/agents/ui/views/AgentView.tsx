'use client'
import { DataTable } from '@/components/datatable'
import ErrorSate from '@/components/ErrorSate'
import LoadingSate from '@/components/LoadingSate'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query'
import { collectSegments } from 'next/dist/build/segment-config/app/app-segments'
import React from 'react'
import { columns } from '../componets/Column'
import { useRouter } from 'next/navigation'
import Emptystate from '@/components/Emptystate'
import { useAgentsFilter } from '../../hooks/use-agents-filter'
import DataPagination from '../componets/dataPagination'

const AgentView = () => {
  const trpc = useTRPC()
  const [filters, setFilters] = useAgentsFilter()
  const { data } = useSuspenseQuery(
    trpc.agents.getAll.queryOptions({ ...filters })
  )
  const router = useRouter()
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      {
        data.items.length!== 0 && (

          <>
            <DataTable
              data={data.items}
              columns={columns}
              onRowClick={(row) => router.push(`/agents/${row.id}`)}

            />
            <DataPagination
              page={filters.page}
              totalPages={data.totalPages}
              onPageChange={(page: number) => setFilters({ page })}
            />
          </>
        )
      }
      {data.items.length == 0 && (
        <Emptystate
          title='Create your first  agents'
          description='Create an agents  to join your  metting>each agent will follow your instruction and  can interact with participants during the call'
        />
      )}
    </div>
  )
}

export default AgentView

export const AgentsViewLoading = () => {
  return (
    <LoadingSate
      title='Loading Agents'
      description='This may take few moments'
    />
  )
}
export const AgentViewError = () => {
  return (
    <ErrorSate title='Something  Went Wrong ' description='Please Try Again' />
  )
}