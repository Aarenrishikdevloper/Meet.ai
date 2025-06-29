import { SidebarProvider } from '@/components/ui/sidebar'
import DashboardNavbar from '@/modules/dashboard/components/DashboardNavbar'
import DashboardSidebar from '@/modules/dashboard/components/DashboardSidebar'
import React, { PropsWithChildren } from 'react'

const Layout = ({children}:PropsWithChildren) => {
  return (
    <SidebarProvider>
        <DashboardSidebar/>
    <main className='flex flex-col h-screen w-screen bg-muted'>
        <DashboardNavbar/>
        {children}
    </main>
    </SidebarProvider>
  )
}

export default Layout