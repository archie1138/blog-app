import { useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../services/auth';
import { login as storeLogin} from '../../features/authSlice';
import { Link, useNavigate } from 'react-router';
import {Button, Input, Logo} from '../index' 
import {useForm} from 'react-hook-form'

function Login() {
    const [error, setError] = useState("") ;
    const dispatch = useDispatch()
    const navigate = useNavigate() 
    const {register, handleSubmit, formState : {errors} } = useForm()
    const emailRegex = /^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?/.()<>[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?/.()<>[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d-]+(?:\.[a-zA-Z\d-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/ 

    const onLoginSubmit = async(data) => {
        setError("") 
        try{
            const session = await authService.login(data)
            if(session){
                const userData = await authService.getCurrentUser() ;
                if(userData){
                    dispatch(storeLogin(userData))
                    navigate("/")
                }
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
                Sign into your Account
            </h2>
            <p className='text-xs'>to continue to Bloglio</p>
        </div>
        {error && <p className='text-red-600 m-4'>{error}</p>}
        <div className='flex flex-col'>
            <form onSubmit={handleSubmit(onLoginSubmit)}>
                {/* we still have to send ref to input field */}
                <Input 
                {...register("email", {
                    required:"Email is required",
                    validate:{
                        matchPattern : (value) => emailRegex.test(value) || "Email address must be a valid address"
                    }
                })}
                label={"Email address"} 
                placeholder={"Email address..."} 
                type={"email"} 
                />
                {errors.email && (
                    <p className='text-red-600 m-2'>
                        • {errors.email.message}
                    </p>
                )}
                <Input 
                {...register("password", {
                    required : "Password is required" ,
                })}
                label={"Password"} 
                placeholder={"Password..."} 
                type={"password"} 
                />
                {errors.password && (
                    <p className='text-red-600 m-2'>
                        • {errors.password.message}
                    </p>
                )}
                <div className='flex justify-end'>
                    <Button 
                    type={"submit"}
                    bgColor={"bg-blue-700"}
                    txtColor={"text-zinc-300"}
                    hoverTxtColor={"hover:bg-blue-800"}
                    className='w-2/12 max-w-lg text-center'
                    >
                        Login
                    </Button>
                </div>
                <div className='mt-2 text-base flex gap-2'>
                    <p className=''>
                        Don't have an account?
                    </p>
                    <Link
                    className='text-blue-600 hover:underline hover:text-gray-400'
                    to="/get-started"
                    >
                        Create one!
                    </Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login