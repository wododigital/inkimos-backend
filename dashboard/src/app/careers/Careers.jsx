import React, { useEffect, useState, useRef } from 'react';
import '../../dataTables.css'
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net';
import config from "../../config";
import pdfIcon from '../../assets/PDF_icon.svg.png'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import close from '../../assets/cancel.svg';

const Careers =()=>{
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [formdata,setFormData]=useState();
    const [refresh, setRefresh]=useState(false);
    const tableRef = useRef(null);
    const [date, setDate]=useState('');

    const fetchData = async () => {
      try {
        const response = await axios.post(`${config.baseURL}/api/carees-list`,{
          date:date
         },{ 
          withCredentials: true 
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    useEffect(()=>{
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
        setDate(`${year}-${month}`);
    },[])
  
    useEffect(() => {
      fetchData();
    }, [refresh, date]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        const formattedDate = date.toLocaleDateString('en-GB').replace(',', '');
        return `${time} ${formattedDate}`;
    };
  
    useEffect(() => {
      if (tableRef.current) {
        const table = $(tableRef.current).DataTable({
          data: data,
          columns: [
            { title: "S No", data: null, render: (data, type, row, meta) => meta.row + 1 },
            { title: "Name", data: "full_name"},
            { 
              title: "Email", 
              data: 'email'
            },
            { 
              title: "Contact", 
              data: "contact_num"  
            },
            { 
              title: "Role", 
              data: 'role',
            },
            { 
                title: "Resume", 
                data: null,
                render: function(data, type, row) {
                    return `<a href='${config.baseURL}/media/careers/${row.id}/${row.file_attachment}' target="_blank"><img src="${pdfIcon}" alt="Resume" class='w-5 ' /></a>`; 
                }
            },
            { 
                title: "Applied On", 
                data: 'created_on',
                render: function(data, type, row) {
                    return formatDate(data);
                }
            },
            { 
              title: "Status", 
              data: 'status',
              render: function(data, type, row) {
                  return data;
            }
          }


          ],
        
          rowCallback: (row, data) => {
            $(row).on('click', (event) => {
              setOpen(true);
              setFormData(data);
            });
          }
          
        });
  
        return () => {
          if (table) {
            table.destroy();
          }
        };
      }
  
      
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formdata, 
          [name]: value 
        });
    };

    const formHandler=(e)=>{
      e.preventDefault();
      axios.put(`${config.baseURL}/api/career/status`,{
        id:formdata.id,
        status:formdata.status
      },{
        withCredentials: true 
      })
      .then((res)=>{
        if(res.data.status==='success'){
          setOpen(false);
          setRefresh(!refresh);
        }
      })
      .catch((err)=>console.log(err));
    }

    return(
        <>
            <div className="p-4 max-w-full mx-auto mt-12 font-noto">
                <div className="flex justify-between mb-4">
                    <p className='text-2xl font-bold text-black'>Careers</p>
                    <input type="month"  onChange={(e)=>setDate(e.target.value)} value={date}  className="block rounded-md border-0 py-1.5 w-36 text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red focus:outline-none  sm:text-sm sm:leading-6" /> 
                </div>        
                <div className="overflow-x-auto table-responsive ">
                    <table id="projectsTable" ref={tableRef} className="display cell-border compact hover order-column row-border stripe w-full text-left table table-striped">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Name </th>
                                <th>Email</th>
                                <th>Contact</th>
                                <th>Role</th>
                                <th>Resume</th>
                                <th>Applied On</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <Dialog open={open} onClose={setOpen} className="relative z-10">  
                        <DialogBackdrop
                            transition
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                        />
                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <DialogPanel
                                transition
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                            >
                                <div className="flex align-middle justify-between px-4 py-4">
                                    <DialogTitle as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                                        Applicant Information
                                    </DialogTitle>
                                    <div className="flex align-middle justify-end ">
                                        <img className="hover:cursor-pointer" onClick={() => setOpen(false)} src={close} alt="close-img"/>
                                    </div>
                                </div>
                                
                                <div className="bg-white px-4 pb-4 pt-0 sm:pb-4">
                                    <div className="sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                            <div className="mt-2">
                                               {/*  */}
                                                <form onSubmit={formHandler}>
                                                  <div className=" border-gray-100">
                                                    <dl className="divide-y divide-gray-100">
                                                      <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{formdata && formdata.full_name }</dd>
                                                      </div>
                                                      <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Application for</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{formdata && formdata.role }</dd>
                                                      </div>
                                                      <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{formdata && formdata.email }</dd>
                                                      </div>
                                                      <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Contact</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{formdata && formdata.contact_num }</dd>
                                                      </div>
                                                    
                                                      <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Status</dt>
                                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                        <select 
                                                            id="status"  
                                                            value={formdata?.status || ''}  
                                                            name="status" 
                                                            required
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-red focus:outline-none focus:border-0 sm:max-w-xs sm:text-sm sm:leading-6"
                                                            onChange={handleChange}
                                                          >
                                                            {formdata?.status === '' ? (
                                                              <option value="" disabled>Select</option>
                                                            ) : null}
    
                                                            <option value="pending">Pending</option>
                                                            <option value="follow-up">Follow up</option>
                                                            <option value="rejected">Rejected</option>
                                                            <option value="closed">Closed</option>
                                                          </select>

                                                        </dd>
                                                      </div>
                                                      <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                        <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
                                                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                                          <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                                            <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                                              <div className="flex w-0 flex-1 items-center">
                                                                <svg className="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                                  <path fillRule="evenodd" d="M15.621 4.379a3 3 0 0 0-4.242 0l-7 7a3 3 0 0 0 4.241 4.243h.001l.497-.5a.75.75 0 0 1 1.064 1.057l-.498.501-.002.002a4.5 4.5 0 0 1-6.364-6.364l7-7a4.5 4.5 0 0 1 6.368 6.36l-3.455 3.553A2.625 2.625 0 1 1 9.52 9.52l3.45-3.451a.75.75 0 1 1 1.061 1.06l-3.45 3.451a1.125 1.125 0 0 0 1.587 1.595l3.454-3.553a3 3 0 0 0 0-4.242Z" clipRule="evenodd" />
                                                                </svg>
                                                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                                  <span className="truncate font-medium">{formdata && formdata.file_attachment }</span>
                                                                  {/* <span className="flex-shrink-0 text-gray-400">4.5mb</span> */}
                                                                </div>
                                                              </div>
                                                              <div className="ml-4 flex-shrink-0">
                                                                <a href={`${config.baseURL}/api/download/${formdata && formdata.id}/${formdata && formdata.file_attachment}`} className="font-medium text-red"  download={formdata?.file_attachment}>Download</a>
                                                              </div>
                                                            </li>
                                                          </ul>
                                                        </dd>
                                                      </div>
                                                    </dl>
                                                  </div>
                                                  <button
                                                    type="submit"
                                                    className="w-full justify-center rounded-md bg-red px-3 py-2 text-sm font-semibold text-white shadow-sm "
                                                  >
                                                      Save
                                                    </button>  
                                                </form>
                                               {/*  */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </DialogPanel>
                            </div>
                        </div>
                </Dialog>
            </div>
        </>
    )
} 

export default Careers;