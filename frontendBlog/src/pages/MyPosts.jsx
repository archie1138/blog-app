import  { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import databaseService from '../services/database'
import { PostCard } from '../components'

function MyPosts() {
   const [posts, setPosts] = useState([]) 
   const {slug} = useParams()

    useEffect(() => {
        async function getMyPosts() {
            const result = await databaseService.getUserPosts(slug)
            if(result){
                setPosts(result.rows) 
            }
        }
        getMyPosts() ;
    }, [slug])

  return (
    <div className='w-full min-h-[70vh] px-4 flex flex-col justify-center items-center gap-10'>
       {posts?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <PostCard key={post.$id} post={post}/>
            ))}
        </div>)
        : (
            <div className='flex flex-col'>
                <h1 className="text-xl font-medium text-gray-600">
                    No posts yet
                </h1>
                <Link
                    className='text-blue-500 underline cursor-pointer hover:text-zinc-400'
                    to="/add-post"
                >Create one now!</Link>
            </div>
        )}
    </div>
  )
}

export default MyPosts