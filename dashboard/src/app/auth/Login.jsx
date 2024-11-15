import React ,{useState} from 'react'
import logo from '../../assets/logo.webp'
import axios from 'axios'
import config from '../../config'
import { useNavigate } from 'react-router-dom'
const Login =()=>{
    const navigate =useNavigate();
    const [formData,setFormData]=useState({
        email:null,
        password:null
    })

    const [errors, setErrors] = useState({}); 

    const validate = () => {
        let errors = {};

        if (!formData.email || formData.email.trim()==="") {
          errors.email = 'Email is required';
        }else {
            // Regex for validating email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                errors.email = 'Invalid email format';
            }
        }

        if (!formData.password || formData.password.trim()==="") {
            errors.password = 'Password is required';
        }

        return errors;
    };
    
    const formHandler=(e)=>{
        e.preventDefault();
        const validationErrors = validate(); 
        if (Object.keys(validationErrors).length === 0) {
            // console.log(formData);
            axios.post(`${config.baseURL}/login`,formData,{
                withCredentials: true  
            })
            .then((res)=>{
                if(res.data.status==='success'){
                    console.log('login success');
                    navigate('/');
                }else{
                    setErrors((prevData)=>({
                        ...prevData,
                        password:res.data.message
                    }))
                }

            })
            .catch((err)=>console.log(err))
        }else {
          setErrors(validationErrors);
        }
    }

    const inputHandler=(e)=>{
        const { name, value}=e.target;
        setFormData((prevData)=>({
            ...prevData,
            [name]:value
        }))
    }
    return(
        <>
            <div className="flex min-h-full flex-col  justify-center px-6 py-12 lg:px-8 ">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto w-32" src={logo} alt="Your Company" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={formHandler}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input name="email" type="email"  value={formData.email} onChange={inputHandler} className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green sm:text-sm sm:leading-6 focus:outline-none" />
                            </div>
                            {errors.email && <p className="text-red">{errors.email}</p>}
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                {/* <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                                </div> */}
                            </div>
                            <div className="mt-2">
                                <input name="password" type="password" value={formData.password} onChange={inputHandler} className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green sm:text-sm sm:leading-6 focus:outline-none" />
                            </div>
                            {errors.password && <p className="text-red">{errors.password}</p>}
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-green px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ">Sign in</button>
                        </div>
                    </form>

                    {/* <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?
                        <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
                    </p> */}
                </div>
            </div>
        </>
    )
}

export default Login