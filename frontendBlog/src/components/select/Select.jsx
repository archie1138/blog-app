import { useId } from "react"

function Select({
    label, 
    options, 
    className="",
    ref,
    ...props
}) {
    const id = useId() ;
  return (
    <div className="w-full flex flex-col">
        {label && <label
        className="inline-block mb-1 pl-1"
        htmlFor={id}
        >
          {label}
        </label>
        }
        <select 
        className={`p-1 border w-fit rounded-lg ${className}`}
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

export default Select