
function Container({children}) {
  return (
    <div className="w-full min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      {children}
    </div>
  )
}

export default Container