import { Link } from "react-router"
import storageService from "../../services/storage"



function PostCard({post}) {
  return (
    <Link to={`/post/${post.slug}`}>
        <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50">
            <div className="w-full justify-center">
                <img src={storageService.getFilePreview(post.featuredImage)} alt={post.title} className="rounded-xl"/>
            </div>
            <h2 className="text-xl font-bold">
                {post.title}
            </h2>
        </div>
    </Link>
  )
}

export default PostCard