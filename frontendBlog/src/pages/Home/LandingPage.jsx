import React from 'react'
import { useNavigate } from 'react-router'

function LandingPage() {

  const navigate = useNavigate() 

  return (
    <div className='w-full min-h-[70vh] px-4 flex flex-col justify-center items-center gap-10'>

      {/* Hero Section */}
      <div className='flex flex-col flex-wrap gap-4 items-center'>
        <p className='text-3xl md:text-4xl font-bold font-mono text-center'>
          Your thoughts. Your stories. Your Bloglio.
        </p>
        <p className='font-mono text-center max-w-xl'>
          A place to share your thoughts, ideas, and stories with the world.   
        </p>
      </div>

      {/* Visual Section */}
      <div className="w-full max-w-3xl flex justify-center py-8">

        <div className="w-full max-w-2xl bg-white dark:bg-zinc-900
                        border border-zinc-200 dark:border-zinc-700
                        rounded-xl shadow-xl overflow-hidden
                        rotate-1 hover:rotate-0 transition-transform duration-300">

          {/* Browser/Header */}
          <div className="flex items-center gap-2 px-4 py-3
                          border-b border-zinc-200 dark:border-zinc-700">

            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>

            <span className="ml-3 font-mono text-sm text-zinc-500">
              bloglio.com
            </span>
          </div>

          {/* Editor */}
          <div className="p-8">

            <p className="font-mono text-sm text-zinc-500 mb-3">
              New Post
            </p>

            <h2 className="text-2xl md:text-3xl font-bold font-mono mb-4">
              Your next great idea
            </h2>

            <div className="space-y-3">
              <div className="h-3 w-full bg-zinc-200 dark:bg-zinc-700 rounded"></div>
              <div className="h-3 w-5/6 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
              <div className="h-3 w-4/6 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
            </div>

            <div className="flex justify-between items-center mt-8">

              <span className="font-mono text-sm text-zinc-500">
                ✍️ Start writing...
              </span>

              <button 
              onClick={() => {navigate("/get-started")}}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white font-mono hover:bg-blue-700 transition">
                Publish →
              </button>

            </div>

          </div>
        </div>

      </div>

      {/* Why Section */}
      <div className='bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm max-w-2/3 p-6'>
        <h1 className='text-xl font-bold font-mono text-center mb-4'>
          Why Bloglio? 
        </h1>
        <div className="font-mono flex flex-col md:flex-row justify-evenly md:divide-x divide-zinc-300 dark:divide-zinc-700">
          <div className='px-6'>
            ✍️ Write
            <div>Turn your ideas into engaging stories.</div>
          </div>
          <div className='px-6'>
            📖 Read
            <div>Explore posts and perspectives from the Bloglio community.</div>
            </div>
          <div className='px-6'>
            🌎 Share
            <div>
              Share your thoughts with people who care.
            </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage