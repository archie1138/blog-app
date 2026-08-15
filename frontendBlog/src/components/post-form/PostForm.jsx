import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import storageService from "../../services/storage"
import databaseService from "../../services/database"
import Input from "../input/Input"
import RTE from "../real-time-text-editor/RTE"
import Select from "../select/Select"
import Button from "../button/Button"


function PostForm({post}) {
    const {register, handleSubmit, watch, setValue, control, getValues, subscribe} = useForm({
        defaultValues:{
            title : post?.title || "",
            slug : post?.$id || "",
            content : post?.content || "",
            status : post?.status || "active",
        }
    })

    const [error, setError] = useState("")
    const navigate = useNavigate() 
    const userData = useSelector(state => state.auth.userData)

    const onFormSubmit = async(data) => {
        setError("")
        try{
            if(post){
                const file = data.image?.[0] ? await storageService.uploadFile(data.image[0]) : null 
                if(file){
                    await storageService.deleteFile(post.featuredImage)
                }
                const dbPost = await databaseService.updatePost({
                    ...data,
                    featuredImage : file ? file.$id : post.featuredImage,
                })

                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
            else{
                const file = data.image?.[0] ? await storageService.uploadFile(data.image[0]) : null 

                const dbPost = await databaseService.createPost({
                    ...data,
                    featuredImage : file ? file.$id : null,
                    userId : userData.$id, 
                })

                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
        catch(e){
            setError(e.message)
        }
    }

    const slugTransform = useCallback((value) => {
        if(value && typeof value === "string"){
            return value.trim()
            .toLowerCase()
            .replace(/[^a-zA-Z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
        }
        else return ""
    }, [])

    useEffect(() => {
        // eslint-disable-next-line react-hooks/incompatible-library
        const subscription = watch((value, {name}) => {

                if(name === "title"){
                    setValue('slug', slugTransform(value.title),
                    {shouldValidate : true})
                }

        })

        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])

  return (
    <div className="flex flex-col justify-center mx-auto w-full max-w-2/3 border 
    bg-white dark:bg-zinc-900  border-zinc-200 dark:border-zinc-800
    text-zinc-900 dark:text-zinc-50 rounded-lg p-4 gap-2">
        {error && <p className='text-red-600 mt-8'>{error}</p>}
        <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label={"Title"}
                    placeholder={"Enter post title here..."}
                    {...register("title", {
                        required : true,
                    })}
                />
                <Input
                    label={"Slug"}
                    placeholder={"Enter post slug here..."}
                    {...register("slug", {
                        required : true,
                    })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), {shouldValidate : true})
                    }}
                />
                <RTE 
                    name={"content"}
                    label={"Content"}
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>
            <div className="w-1/3 px-2">
                <Input 
                    label={"Cover Image"}
                    type={"file"}
                    accept={"image/png, image/jpg, image/jpeg, image/gif"}
                    {...register("image")}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img 
                            src={storageService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )
                }
                <Select 
                    label={"Status"}
                    options={["active", "inactive"]}
                    className="dark:bg-gray-800 bg-gray-200 dark:border-gray-600 border-gray-400 mb-4"
                    {...register("status", {
                        required : true
                    })}
                />
                <Button
                    type={"submit"}
                    bgColor={"bg-blue-700"}
                    txtColor={"text-zinc-300"}
                    hoverTxtColor={"hover:bg-blue-800"}
                    className='max-w-lg text-center'
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    </div>
  )
}

export default PostForm