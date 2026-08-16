import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router"
import databaseService from "../services/database"
import storageService from "../services/storage"
import { Button } from "../components"
import parse from 'html-react-parser'

function Post() {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    const isAuthor = post && userData ? post.userId === userData.$id : false ;

    useEffect(() => {
        async function getPost() {
            const result = await databaseService.getPost(slug)
            if(result){
                setPost(result)
            }
            else{
                navigate("/")
            }
        }
        if(slug){
            getPost()
        }
        else{
            navigate("/")
        }
    }, [navigate, slug])

    const deletePost = () => {
        async function remove(){
            const result = await databaseService.deletePost(post.$id)
            if(result){
                await storageService.deleteFile(result.featuredImage)
                navigate("/")
            }
            else{
                console.error("Couldnt Delete Post")
            }
        }
        remove()
    }

  return ( post ? 
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm px-6 py-4">
        <div className="w-full flex flex-col mb-4 relative  border rounded-xl p-2">
            <img 
                src={storageService.getFilePreview(post.featuredImage)} 
                alt={post.title} 
                className="max-h-125 max-w-4xl  w-full rounded-xl"
            />
            { (isAuthor &&
                <div className="flex flex-wrap gap-4 mt-5"> 
                    <Link to={`/edit-post/${slug}`}>
                        <Button 
                        bgColor={"bg-blue-700"}
                        txtColor={"text-zinc-300"}
                        hoverTxtColor={"hover:bg-blue-800"}
                        className='text-center'>
                            Edit
                        </Button>
                    </Link>
                    <Button
                    onClick={deletePost}
                    bgColor={"bg-red-700"}
                    txtColor={"text-zinc-300"}
                    hoverTxtColor={"hover:bg-red-800"}
                    className='text-center'
                    >
                        Delete
                    </Button>
                </div>

            )}
        </div>
        <div className="w-full mb-6">
            <h1 className="text-5xl text-zinc-700 dark:text-amber-50 font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">
            {parse(post.content)}
        </div>
    </div> 
    : null
  )
}

export default Post