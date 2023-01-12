import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import {Link} from "react-router-dom"
import validator from "validator"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import {useForm} from "react-hook-form"
import "./Right.css";
export default function SingIn({headingText}){
    const [error,setError] = useState(false);
    const navigate = useNavigate()
    const LoginSchema = yup.object().shape({
        userEmailOrPhone:yup.string().required("Email or Phone number required"),
        password:yup.string().required(),
      })
      const {register,handleSubmit,formState:{errors}} = useForm({resolver:yupResolver(LoginSchema)})

    const onSubmit = (data) =>{
        console.log(data)
        if(validator.isEmail(data.userEmailOrPhone) ||  validator.isMobilePhone(data.userEmailOrPhone)){
      
            axios
                .post("http://localhost:4000/login", {
                    userEmailOrPhone: data.userEmailOrPhone,
                    password: data.password,
                }).then((res) => {
                    console.log(res)
                    navigate(`/orders/${res.data.user._id}`, { state: { token: res.data.token } })
                }).catch((error) => {
                    console.log(error);
                    setError(true)
                });
        }else{
            setError(true)
        }
    }

    return <form action="#" className="form" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="heading">{headingText}</h1>
            {error?<p id="error">Invalid Username or Password</p>:""}
            <div className="form-floating mb-3">
            
                <input
                
                className="form-control shadow-none"
                placeholder="Mobile / Email"
                autoComplete="off"
                
                {...register("userEmailOrPhone")}
                />
                <label>Mobile / Email</label>
                <p className="error">{errors.userEmailOrPhone?.message}</p>
            </div>
            <div className="form-floating mb-3">
                <input
                type="password"
                className="form-control shadow-none"
                placeholder="Password"
                autoComplete="off"
                
                {...register("password")}
                />
                <div className="image"></div>
                <label>Password</label>
                <p className="error">{errors.password?.message}</p>
                <Link className="text">Forget Password?</Link>
            </div>
            <div className="mb-3 text-center">
                <button className="btn">Sign In</button>
            </div>
        </form>
      
}