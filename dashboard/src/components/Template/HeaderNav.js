import React,{useState,useEffect} from 'react'
import Logo from '../../assets/logo.png'
import {Link} from 'react-router-dom'
import './styleHeader.css'
import Notification from '../Notification/Notification';
import BaseURL from '../Other/BaseURL';


function HeaderNav(){

    var sideNavBar = document.querySelector('.side_nav_bar_new');

    function open_side_nav(){
        document.getElementById('menu_icon_new_open').style.display='none';
        document.getElementById('menu_icon_new_close').style.display='block';
        document.querySelector('.side_nav_bar_new').style.left = '177px';
    }

    function close_side_nav(){
        document.getElementById('menu_icon_new_open').style.display='block';
        document.getElementById('menu_icon_new_close').style.display='none';
        document.querySelector('.side_nav_bar_new').style.removeProperty('left');
    }



    return (
        <div>
            <div className='header_container' style={{zIndex:99}}>
                <nav className="navbar navbar-expand-lg navbarblur">
                    <div className="container-fluid">
                        <a className="navbar-brand" style={{fontWeight:'600'}} href="./dashboard">
                            <img src={Logo} alt="" style={{width:110}}/>
                        </a>

                        <div style={{display:'flex',alignItems: 'center'}}>
                            <button className="navbar-toggler" type="button"   aria-controls="navbarSupportedContent"  aria-label="Toggle navigation">
                                <div id='menu_icon_new_open'  onClick={open_side_nav}>
                                    <i className="fas fa-bars"> </i>
                                </div>
                                <div id='menu_icon_new_close' style={{display:'none'}} onClick={close_side_nav}>
                                    <i className="fas fa-times"> </i>
                                </div>
                            </button>

                            <div className='dropdown navbar-toggler' style={{position:'relative'}}>
                                <span className='notificationBadge verticle_center' style={{display:'none'}} id='notificationBadgeId'></span>
                                <i className='fas fa-bell' data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside" style={{fontSize:20,cursor:'pointer'}}></i>
                                {/* <img  src={NotificationIcon} alt="" style={{cursor:'pointer'}}/> */}
                                <Notification/>
                            </div>
                        </div>

                        <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        
                        </ul>
                        <ul className="navbar-nav d-flex">
                                {/* <div className="position-relative">
                                    <i className="fas fa-bell"> </i>
                                </div> */}
                                <div className='dropdown' style={{position:'relative'}}>
                                    <span className='notificationBadge verticle_center' style={{display:'none'}} id='notificationBadgeId'></span>
                                    <i className='fas fa-bell' data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside" style={{fontSize:20,cursor:'pointer'}}></i>
                                    {/* <img  src={NotificationIcon} alt="" style={{cursor:'pointer'}}/> */}
                                    <Notification/>
                                </div>
                        </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default HeaderNav