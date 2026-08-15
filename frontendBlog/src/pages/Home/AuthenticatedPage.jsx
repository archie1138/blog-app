import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { Link } from "react-router";
import databaseService from "../../services/database";
import { Button, PostCard } from "../../components";

export default function AuthenticatedPage() {

    const [loader, setLoader] = useState(true)
    const user = useSelector(state => state.auth.userData) ;
    const [posts, setPosts] = useState(null) 

    useEffect(() => {
        async function getUserPosts() {
            try{
                const result = await databaseService.getUserPosts(user?.$id)
                if(result){
                    setPosts(result)
                }
            }
            catch(e){
                console.error(e.message)
            }
            finally{
                setLoader(false)
            }
        }
        getUserPosts()
    }, [user])

  return (
    loader ? <h1>Loading...</h1> : (
    <div className='w-full min-h-[70vh] px-4 flex flex-col justify-center items-center gap-10'>

        {/* Welcome Section */}
        <div className='flex flex-col flex-wrap gap-2'>
            <p className='text-3xl md:text-4xl font-bold font-mono text-center'>
                Welcome back, {user?.name} 👋
            </p>
            <p className='font-mono max-w-xl'>
                What are you thinking about today?  
            </p>
        </div>

        {/* Welcome Section */}        
        <div className="flex flex-col flex-wrap">
            <p className="font-mono text-center max-w-xl">
                Have something to say?
            </p>
            <Link
             to="/add-post"
             className="px-6 translate-x-2 text-zinc-500 underline cursor-pointer hover:text-zinc-400">
                Create a post → 
            </Link>
        </div>

        {/* User Posts Section */}
        <div className='flex flex-col w-full max-w-4xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm px-6 py-4'>
            <p className="font-mono text-xl max-w-xl px-6 mb-4">
                Your Posts
            </p>
            {posts?.rows?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-6">
                    {posts?.rows.slice(0, 3).map(post => (
                    <PostCard key={post.$id} post={post}/>
                    ))}
                </div>
            ) : (
                <p className="font-mono text-zinc-500 px-6 mb-2">
                    You haven't written any posts yet.
                </p>
            )}
            <div className="font-mono px-6">
                <p>{posts?.total ? posts?.total : 0} Posts</p>
            </div>
            <Link
                to={`/my-posts/${user.$id}`}
                className="px-6 text-zinc-500 underline cursor-pointer hover:text-zinc-400"
            >
                View all my posts →
            </Link>
        </div>

        {/* Explore Section */}
        <div className='bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm w-full max-w-4xl px-6 py-3'>
            <p className="font-mono text-xl max-w-xl px-6 mb-2">
                Explore 
            </p>
            <div className="font-mono flex flex-col md:flex-row justify-evenly text-center md:divide-x divide-zinc-300 dark:divide-zinc-700 text-zinc-500">
                <Link className="flex-1 px-6 hover:underline cursor-pointer hover:text-zinc-400">Programming</Link>
                <Link className="flex-1 px-6 hover:underline cursor-pointer hover:text-zinc-400">AI</Link>
                <Link className="flex-1 px-6 hover:underline cursor-pointer hover:text-zinc-400">Technology</Link>
                <Link className="flex-1 px-6 hover:underline cursor-pointer hover:text-zinc-400">Education</Link>
                <Link className="flex-1 px-6 hover:underline cursor-pointer hover:text-zinc-400">Travel</Link>
            </div>
        </div>

    </div>
    )
  )
}

