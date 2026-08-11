
function Button({
    children, 
    bgColor="bg-zinc-50 dark:bg-zinc-950" , 
    txtColor="text-gray-500 dark:text-gray-400", 
    hoverTxtColor = "hover:text-gray-700 dark:hover:text-gray-300", 
    className="",
    ...props
}) {
  return (
    <button
    {...props}
    className={`inline-flex items-center px-2 py-1 text-sm font-medium transition-colors duration-200 rounded-lg ${bgColor} ${txtColor} ${hoverTxtColor} ${className}`}
    >
        {children}
    </button>
  )
}

export default Button