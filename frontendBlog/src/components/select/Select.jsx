import React, { useId } from "react"

function Select({
    label, 
    options, 
    className="",
    ...props
}, ref) {
    const id = useId() ;
  return (
    <div className="w-full">
        {label && <label
        className="inline-block mb-1 pl-1"
        htmlFor={id}
        >
          {label}
        </label>
        }
        <select 
        className={`${className}`}
        {...props}
        id={id}
        ref={ref}
        >
          {options?.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)