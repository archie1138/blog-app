import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import databaseService from "../services/database"
import { PostForm } from "../components"

function EditPost() {
    const [loader, setLoader] = useState(true)
    const [post, setPost] = useState(null) 
    const {slug} = useParams() 
    const navigate = useNavigate()

    useEffect(() => {

        async function getPost() {
            try{
                const result =  await databaseService.getPost(slug) ;
                if(result){
                    setPost(result)
                }
            }
            catch(e){
                console.error(e.message)
            }
            finally{
                setLoader(false)
            }
        }

        if(slug){
            getPost()
        }
        else{
            navigate("/") 
        }

    }, [slug, navigate])
  return (
    loader ? <h1>Loading Post...</h1> : 
        post ? <PostForm post={post} /> : <h1>Could not find the post</h1>
  )
}

export default EditPost