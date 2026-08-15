
function Button({
    children, 
    bgColor="bg-zinc-50 dark:bg-zinc-950" , 
    txtColor="text-gray-500 dark:text-gray-400", 
    hoverTxtColor = "hover:text-gray-700 dark:hover:text-gray-300", 
    hoverColor="",
    className="",
    ...props
}) {
  return (
    <button
    {...props}
    className={`inline-flex items-center justify-center px-2 py-1 text-sm font-medium active:scale-99 ease-in-out transition-all duration-200 rounded-lg cursor-pointer ${bgColor} ${txtColor} ${hoverTxtColor} ${hoverColor} ${className}`}
    >
        {children}
    </button>
  )
}

export default Button