import React, { PropsWithChildren } from 'react'

const layout = ({children}:PropsWithChildren) => {
  return (
    <div className='bg-muted flex min-h-svh flex-col items-center justify-center  p-6 mb:p-10'>  
      <div className="w-full md:max-w-3xl">{children}</div>

    </div>
  )
}

export default layout