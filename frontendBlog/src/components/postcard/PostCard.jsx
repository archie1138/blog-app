import { Link } from "react-router"
import storageService from "../../services/storage"



function PostCard({post}) {
  return (
    <Link to={`/post/${post.slug}`}>
        <div className="w-full flex flex-col bg-white dark:bg-zinc-900 border-2 rounded-xl dark:border-blue-500 text-zinc-900 dark:text-zinc-50 p-2">
            <div className="w-full">
                <img src={storageService.getFilePreview(post.featuredImage)} alt={post.title} className="rounded-xl"/>
            </div>
            <h2 className="text-xl text-center font-bold">
                {post.title}
            </h2>
        </div>
    </Link>
  )
}

export default PostCard