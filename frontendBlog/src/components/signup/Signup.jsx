import { useState } from "react"
import { useForm } from "react-hook-form"
import authService from "../../services/auth"
import { Link, useNavigate } from "react-router"
import Logo from "../logo/Logo"
import Input from "../input/Input"
import Button from "../button/Button"


function Signup() {

    const [error, setError] = useState("")
    const {register, handleSubmit} = useForm()
    const navigate = useNavigate() 
    const emailRegex = /^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?/.()<>[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?/.()<>[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d-]+(?:\.[a-zA-Z\d-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/ 
    const passwordRegex = /^((?=.*[\d])(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[a-z])(?=.*[^\w\d\s])).{7,30}$/

    
    const onSignupSubmit = async(data) => {
        setError("") ;
        try{
            const user = await authService.createAccount(data) ;
            if(user){
                navigate("/")
            }
        }
        catch(e){
            setError(e.message) 
        }
    }

  return (
    <div
    className='flex flex-col justify-center mx-auto w-full max-w-lg border 
    bg-white dark:bg-zinc-900  border-zinc-200 dark:border-zinc-800
    text-zinc-900 dark:text-zinc-50 rounded-lg p-8 gap-2'
    >
        <div className='flex'>
            <span className='inline-block max-w-25'>
                <Logo className="w-40 h-auto"/>
            </span>
        </div>
        <div className='flex flex-col mb-4'>
            <h2 className='text-2xl font-bold leading-tight'>
                Create your Bloglio account
            </h2>
        </div>
        {error && <p className='text-red-600 mt-8'>{error}</p>}
        <div className='flex flex-col'>
            <form onSubmit={handleSubmit(onSignupSubmit)}>
                {/* we still have to send ref to input field */}
                <Input 
                {...register("name", {
                    required:true,
                })}
                label={"Name"} 
                placeholder={"Name..."} 
                type={"text"} 
                />
                <Input 
                {...register("email", {
                    required:true,
                    validate:{
                        matchPattern : (value) => emailRegex.test(value) || "Email address must be a valid address"
                    }
                })}
                label={"Email address"} 
                placeholder={"Email address..."} 
                type={"email"} 
                />
                <Input 
                {...register("password", {
                    required : true ,
                    validate : {
                        matchPattern : (value) => passwordRegex.test(value) || "Password must be a valid password"
                    }
                })}
                label={"Password"} 
                placeholder={"Password..."} 
                type={"password"} 
                />
                <div className='flex justify-end'>
                    <Button 
                    type={"submit"}
                    bgColor={"bg-blue-700"}
                    txtColor={"text-zinc-300"}
                    hoverTxtColor={"hover:bg-blue-800"}
                    className='w-2/12 max-w-lg text-center'
                    >
                        Sign Up
                    </Button>
                </div>
                <div className='mt-2 text-base flex gap-2'>
                    <p className=''>
                        Already have an account?
                    </p>
                    <Link
                    className='text-blue-600 hover:underline hover:text-gray-400'
                    to="/login"
                    >
                        Sign in
                    </Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup 