import React, { useId } from 'react'

function Input({
    label,
    type="text",
    className="",
    ref,
    ...props
}) {
    const id = useId() ;
  return (
    <div className='w-full flex flex-col mb-2'>
        {label && <label
        className="inline-block mb-1 pl-1"
        htmlFor={id}>
            {label}
        </label>
        }
        <input type={type} 
        className={`p-2 border-2 border-gray-600/50 rounded-lg ${className}`}
        ref={ref}
        id={id} 
        {...props}
        />
    </div>
  )
}

export default Input