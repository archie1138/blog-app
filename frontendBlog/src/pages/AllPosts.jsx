import { useEffect, useState } from "react"
import databaseService from "../services/database"
import { PostCard } from "../components"

function AllPosts() {

    const [posts, setPosts] = useState([]) 

    useEffect(() => {
        async function getAllPosts() {
            const result = await databaseService.getPosts()
            if(result){
                setPosts(result.rows) 
            }
        }
        getAllPosts() ;
    }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
            <PostCard key={post.$id} post={post}/>
        ))}
    </div>
  )
}

export default AllPosts