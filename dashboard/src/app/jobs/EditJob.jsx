import React, { useEffect, useState } from 'react'
import config from '../../config';
import { useParams } from "react-router-dom";
import axios from 'axios';
import CKEditorWrapper from '../../components/ckeditor/CKEditorWrapper'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react'

const EditJob = () => {
    const { id }=useParams();
    const [data, setData]=useState({
        jobTitle:'',
        jobCategory:'',
        jobOverview:'',
        jobStatus:'',
        jobDescription:'',
        jobId:''
    });

    useEffect(() => {
        axios.get(`${config.baseURL}/api/edit-job/${id}`,{
            withCredentials:true
        })
        .then((res)=>{
            if(res.data.status==='success'){
               const data=res.data.data[0];
               setData({
                    jobTitle:data.job_title,
                    jobCategory:data.job_category,
                    jobOverview:data.overview,
                    jobStatus:data.job_status,
                    jobDescription:data.description,
                    jobId:data.id
               }) ;
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [id]);

    const notify = () => toast.success("Job updated successfully!", {
        position: "top-right"
    });
    
    const inputHandle=(e)=>{
        const { name, value}=e.target;
        setData((preData)=>({
            ...preData,
            [name]:value
        }))
    }

    const formValidation=()=>{
        let errors={};

        if(!data.jobTitle || data.jobTitle.trim() === ""){
            errors.jobTitle="Title is required!";
        }

        if (!data.jobCategory || data.jobCategory.trim() === "") {
            errors.jobCategory = "Category is required!";
        }

        if(!data.jobOverview || data.jobOverview=== ""){
            errors.jobOverview="Overview is required!";
        }
        
        if (!data.jobStatus || data.jobStatus === "") {
            errors.jobStatus = "Status is required!";
        }
        

        if(!data.jobDescription || data.jobDescription=== ""){
            errors.jobDescription="Description is required!";
        }

        return errors;
    }

    const [errors, setErrors]=useState(null);
    const formHandler=(e)=>{
        e.preventDefault();
        const validation=formValidation();
        if(Object.keys(validation).length > 0){
            setErrors(validation)
        }else{
            setErrors(null);
            axios.post(`${config.baseURL}/api/update-job`, data,{
                withCredentials: true
            })
            .then((res)=>{
                if(res.data.status==='success'){
                    notify();
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }
    
    return (
        <div className=''>
            <div className="my-3"><Link to="/jobs"><ChevronLeft/></Link></div>
            <ToastContainer/>
            <form className='w-full lg:w-1/2 py-5 ms-5' onSubmit={formHandler}>
                <div className="space-y-12">
                    <div className="pb-12">
                        <h2 className="text-2xl font-semibold text-gray-900">Job Details</h2>
                        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-6">
                            <div className="sm:col-span-5">
                                <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                                    Job Title
                                </label>
                            
                                <div className="mt-2">
                                    <input
                                        name="jobTitle"
                                        type="text"
                                        value={data.jobTitle}
                                        onChange={inputHandle}
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green outline-none sm:text-sm/6"
                                    />
                                    {errors && <p className='text-red-600 text-sm'>{errors.jobTitle}</p>}
                                </div>
                                
                            </div>

                            <div className="sm:col-span-5">
                                <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                                    Job Category
                                </label>
                            
                                <div className="mt-2">
                                    <input
                                        name="jobCategory"
                                        type="text"
                                        value={data.jobCategory}
                                        onChange={inputHandle}
                                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green outline-none sm:text-sm/6"
                                    />
                                    {errors && <p className='text-red-600 text-sm'>{errors.jobCategory}</p>}
                                </div>
                            </div>

                            <CKEditorWrapper label="Job Overview" name="jobOverview" data={data.jobOverview}  onChange={(data) => setData((prevData)=>({...prevData,jobOverview:data}))} error={errors && errors.jobOverview}/>

                            <div className="sm:col-span-5">
                                <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                                    Job Status
                                </label>
                            
                                <div className="mt-2">
                                    <select
                                        value={data.jobStatus}
                                        onChange={inputHandle}
                                        name="jobStatus"
                                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green outline-none sm:text-sm/6"
                                    >
                                        <option value='' disabled>Select</option>
                                        <option value='open'>Open</option>
                                        <option value='closed'>Closed</option>
                                    </select>
                                    {errors && <p className='text-red-600 text-sm'>{errors.jobStatus}</p>}
                                </div>
                            </div>
                            
                            <CKEditorWrapper label="Job Description" name="jobDescription" data={data.jobDescription}  onChange={(data) => setData((prevData)=>({...prevData,jobDescription:data}))} error={errors && errors.jobDescription}/>

          
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm/6 font-semibold text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-green px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}


export default EditJob;