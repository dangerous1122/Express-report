import React from 'react'
import '../components/Workflow/components/fileUpload.css' 

function Loading({load}) {
  return (
    <div className={`fixed z-10 inset-0 h-full overflow-y-auto ${load ? 'fade-in vis' :'fade-in'}`}>
        <div className='flex items-center justify-center'>
        <div
        className=" inline-block opacity-100 h-8 w-8 mt-80 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-warning motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
      </div>
    </div>
    </div>
  )
}

export default Loading