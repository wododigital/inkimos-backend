import React, { useEffect, useState, useRef } from 'react';
import '../../dataTables.css'
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net';
import config from "../../config"
import { Link, useNavigate } from "react-router-dom";

const Jobs = () => {
    const [data, setData] = useState([])
    const tableRef = useRef(null);
    const [date, setDate] = useState('');
    const navigate=useNavigate();

    const fetchData = async () => {
        try {
            const response = await axios.post(`${config.baseURL}/api/get-jobs`, {
                date: date
            }, {
                withCredentials: true
            });
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        setDate(`${year}-${month}`);
    }, [])

    useEffect(() => {
        fetchData();
    }, [date]);

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
                    { title: "Job Title", data: "job_title" },
                    {
                        title: "Job Category",
                        data: 'job_category'
                    },
                    
                    {
                        title: "Num of applications",
                        data: 'num_of_applications',
                    },
                
                    {
                        title: "Created On",
                        data: 'created_on',
                        render: function (data, type, row) {
                            return formatDate(data);
                        }
                    },
                    {
                        title: "Status",
                        data: 'job_status',
                        render: function (data, type, row) {
                            return data;
                        }
                    }


                ],

                rowCallback: (row, data) => {
                    $(row).on('click', (event) => {
                        navigate(`/edit-job/${data.job_code}`)
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

 
    return (
        <>
            <div className="p-4 max-w-full mx-auto mt-12 font-noto">
                <div className="flex justify-between mb-4">
                    <p className='text-2xl font-bold text-black'>Jobs</p>
                    <div className='flex'>
                        <input type="month" onChange={(e) => setDate(e.target.value)} value={date} className="block rounded-md border-0 py-1.5 w-36 text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green focus:outline-none  sm:text-sm sm:leading-6" />
                        <Link to='/add-job'  className='btn bg-green rounded-md py-2 px-5 ms-4 text-white'>Add New Job</Link>
                    </div>
                </div>
                <div className="overflow-x-auto table-responsive ">
                    <table id="projectsTable" ref={tableRef} className="display cell-border compact hover order-column row-border stripe w-full text-left table table-striped">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Job Title </th>
                                <th>Job Category</th>
                                <th>Num of applications</th>
                                <th>Created On</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
               
            </div>
        </>
    )
};

export default Jobs;

