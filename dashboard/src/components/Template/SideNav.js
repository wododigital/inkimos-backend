import React,{useState,useEffect,useCallback} from 'react'
import Logo from '../../assets/logo.png'
import {Link} from 'react-router-dom'
import './styleHeader.css'
import BaseURL from '../Other/BaseURL'
import axios from 'axios'


function SideNav({ current_page }) {

    const [currentPage, setcurrentPage] = useState(window.location.pathname.split('/')[1])

    useEffect(() => {
    
    
    return () => {
        
        // setcurrentPage(current_page)
    }
    }, [])

    const [ContactUsCount, setContactUsCount] = useState(0)

    const DataRefresh = useCallback(async() => {

        await axios.get(BaseURL+'/contact-us/new-query-count',{})
        .then((res)=>{   
            console.log(res.data.data);
            let sum=0;
            res.data.data.forEach(element => {

                for (let key in element) {
                    
                    sum += element[key];

                }
            });

            setContactUsCount(sum)
        })
        .catch((err)=>{console.log(err)})
  
    }, [])

    // useEffect(() => {
    //   DataRefresh();
    // }, [DataRefresh]);
    
    useEffect(() => {
        DataRefresh(); // Initial call
        const intervalId = setInterval(DataRefresh, 10000); // Set interval for every 15 seconds
    
        return () => clearInterval(intervalId); // Clear interval on component unmount
      }, [DataRefresh]);
    

return (
    <div className="side_nav_bar_new">
        <div className="side_menu">
            <ul className="navbar-nav" style={{rowGap:5}}>
                {/* <li className="menu_items_new">
                    <Link className="nav-link" to="/dashboard">
                    <div className="menu_icon_new"><i className="fas fa-home"></i></div> Overview
                    </Link>
                </li> */}

                {/* {currentPage=='Inventory'? <span><div className="menu_icon_new "><i className="fas fa-warehouse"></i></div> Inventory</span>:<span><div className="menu_icon_new"><i className="fas fa-warehouse"></i></div> Inventory</span>}                         */}
                

                {
                    currentPage==='dashboard'?
                        <li className="menu_items_new active_menu_icon_new">
                            <Link className="nav-link" to="/dashboard">
                                <div className="menu_icon_new"><i className="fas fa-home"></i></div> Overview
                            </Link>
                        </li>
                        :
                        <li className="menu_items_new">
                            <Link className="nav-link" to="/dashboard">
                                <div className="menu_icon_new"><i className="fas fa-home"></i></div> Overview
                            </Link>
                        </li>
                }

                {/* {
                    currentPage==='blogs'?
                        <li className="menu_items_new active_menu_icon_new">
                            <Link className="nav-link" to="/blogs">
                                <div className="menu_icon_new"><i className="fas fa-blog"></i></div> Blogs
                            </Link>
                        </li>
                        :
                        <li className="menu_items_new">
                            <Link className="nav-link" to="/blogs">
                                <div className="menu_icon_new"><i className="fas fa-blog"></i></div> Blogs
                            </Link>
                        </li>
                } */}
                
                <li className={`${currentPage==='contact-us'?'active_menu_icon_new':''} menu_items_new`}>
                    <Link className="nav-link" to="/contact-us">
                        <div className="menu_icon_new"><i className="icon-color fas fa-book"></i></div> Contact Us  {ContactUsCount>0?<span className='notification_dot'></span>:''}
                    </Link>
                </li>

                {/* {
                    currentPage==='template'?
                        <li className="menu_items_new active_menu_icon_new">
                            <Link className="nav-link" to="/template">
                                <div className="menu_icon_new"><i className="fas fa-book"></i></div> Template
                            </Link>
                        </li>
                        :
                        <li className="menu_items_new">
                            <Link className="nav-link" to="/template">
                                <div className="menu_icon_new"><i className="fas fa-book"></i></div> Template
                            </Link>
                        </li>
                } */}

                {/* <li className="menu_items_new">
                    <a className="nav-link" href="./send-message">
                        <div className="menu_icon_new"><i className="fas fa-envelope"></i></div> Send Message
                    </a>
                </li>            
                <li className="menu_items_new">
                    <a className="nav-link" href="./api-key">
                        <div className="menu_icon_new"><i className="fas fa-plug"></i></div> API
                    </a>
                </li>
                <li className="menu_items_new">
                    <a className="nav-link" href="./plans">
                        <div className="menu_icon_new"><i className="fas fa-cloud-meatball"></i></div> Plans
                    </a>
                </li>
                <li className="menu_items_new">
                    <a className="nav-link" href="./my-account">
                    <div className="menu_icon_new"><i className="fas fa-user"></i></div> My Account
                    </a>
                </li>
                <li className="menu_items_new">
                    <a className="nav-link" href="./documentation">
                    <div className="menu_icon_new"><i className="fas fa-book"></i></div> Documentation
                    </a>
                </li> */}
                <li className="menu_items_new">
                    <Link className="nav-link" to="/logout">
                    <div className="menu_icon_new"><i className="fas fa-sign-out-alt"></i></div> Logout
                    </Link>
                </li>
            </ul>

        </div>
    </div>
)
}

export default SideNav