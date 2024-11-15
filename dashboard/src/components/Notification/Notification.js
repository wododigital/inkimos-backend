import React, { useEffect, useState,useCallback } from 'react';
import './style.css';
import {useParams } from 'react-router-dom';
import axios from 'axios'
import Cookies from 'js-cookie';
import BaseURL from '../Other/BaseURL';


function Notification() {

    // const [toasts, setToasts] = useState({data:[]});

    const { id } = useParams();
    const cookieExists = Cookies.get('login');
    const clientIDcookie = Cookies.get('clientId');
    const [NotificationCount, setNotificationCount] = useState(0)

  const [toasts, setToasts] = useState([
    {
      id: 1,
      title:'Testing title 1',
      description: "Hello, world! This is a toast message 1. Hello, world! This is a toast message 1.",
      view_status:'1',
      remove_status:'0',
      created_on: "2024/05/30 05:57:31"
    },
    {
        id: 2,
        title:'Testing title 2',
        description: "Hello, world! This is a toast message 2.",
        view_status:'0',
        remove_status:'0',
        created_on: "2024/05/30 05:57:31"
      },
      {
        id: 3,
        title:'Testing title 3',
        description: "Hello, world! This is a toast message 3.",
        view_status:'0',
        remove_status:'0',
        created_on: "2024/05/30 05:57:31"
      }
  ]);



  //   const getNotification = useCallback(async () => {
  //       if(cookieExists===id){
  //           await axios.post(BaseURL+'/client_notification.php',{clientId:clientIDcookie,getNotify:true})
  //           .then((res)=>{   
  //               // const phaseKeys = Object.keys(res.data.phase);
  //               // setToasts(res.data.phase);
  //               // console.log(res.data.phase);
  //               console.log(res.data);
  //               setToasts(res.data);

  //               const count = res.data.data.filter(item => item.view_status === '0').length;
  //               if(count===0){
  //                   document.getElementById('notificationBadgeId').style.display='none';
  //               }else{ 
  //                   var newCount='';
  //                   if(count>=9){
  //                       newCount='9+';
  //                   }else{
  //                       newCount=count;
  //                   }
  //                   document.getElementById('notificationBadgeId').innerHTML=newCount;
  //                   document.getElementById('notificationBadgeId').style.display='flex';
  //               }
  //               setNotificationCount(count);
  //           })
  //           .catch((err)=>{console.log(err)})
  //       }
  //   },[clientIDcookie,cookieExists,id]);

    

  //   useEffect( () => {
  //     getNotification()
  //     const interval = setInterval(() => {
  //       getNotification();
  //     }, 10000);
  //     return () => clearInterval(interval);
  //   }, [cookieExists,id,getNotification])
    

  // const removeNotification = (id) => {
  //   axios.post(BaseURL+'/client_notification.php',{clientId:clientIDcookie,NotifyId:id,removeNotify:true})
  //   .then((res)=>{

  //       if(res.data.status==="success"){
  //           console.log('removed')
  //           getNotification();
  //       }
        
  //   }).catch((err)=>{console.log(err)})
  // };

  // const seenNotification = (id,status) => {
  //   if(status==='0'){
  //       axios.post(BaseURL+'/client_notification.php',{clientId:clientIDcookie,NotifyId:id,seenNotify:true})
  //       .then((res)=>{
    
  //           if(res.data.status==="success"){
  //               console.log('seen')
  //               getNotification();
  //           }
            
  //       }).catch((err)=>{console.log(err)})
  //   }
  // };


  return (
    <>
      <div>
        <div className="dropdown-menu bg-white text-small shadow notification_custom " style={{maxHeight: '308px',overflowY: 'auto',scrollbarWidth: 'none'}} data-popper-placement="bottom-end">
          <div className="list-group px-1 notification_popup">
            {/* <div className='px-1'>Notifications ({NotificationCount})</div> */}
            <div className='px-1 fw-medium'>{NotificationCount>0?`Notifications (${NotificationCount})`:'Notifications'}</div>
            {/* <hr style={{marginTop:'0.3rem',marginBottom:'0rem'}}/> */}
            <div className='card_hr'></div>
              {/* {toasts.data.length === 0 ? (
                <div className='px-1 pt-1'>No notifications</div>
              ) : (
              toasts.data.map((toast) => (
                <ToastV2 key={toast.id} title={toast.title} description={toast.description} timeAgo={toast.timeAgo} view_status={toast.view_status} remove_status={toast.remove_status} onSeen={() => seenNotification(toast.id,toast.view_status)} onClose={() => removeNotification(toast.id)}  />
              ))
            )} */}
            <ToastV2/>
          </div>
        </div>
      </div>
    </>
  );
}


function ToastV2(props){

    const backgroundColor = props.view_status === '0' ? '#FFC704' : '#ffffff00';

    return(
        <>
            <div className="toast show" onMouseOver={props.onSeen} role="alert" aria-live="assertive" aria-atomic="true" style={{backgroundColor:backgroundColor}} >
                <div className='d-flex pt-2' style={{alignItems: 'center' ,paddingLeft:10,paddingRight:10}}>
                    {/* <img src={NotificationRinging} style={{width:14}} className="rounded me-2 ms-2" alt="..."/> */}
                    {/* <i className='fa fa-circle pe-2' style={{fontSize:8}}></i> */}
                    <strong className="me-auto fs12 ">{props.title}</strong>
                    <small className="text-body-secondary px-2" style={{fontSize: 10}}>{props.timeAgo}</small>
                    <button type="button" className="btn-close" data-bs-dismiss="toast" onClick={props.onClose} aria-label="Close"></button>
                </div>
                <div className="toast-body" style={{fontSize:12,paddingTop: 3,paddingRight: 10,paddingLeft: 10}}>
                      {props.description}
                </div>
            </div>
        </>
    );
}

// function Toast(props) {
//   return (
//     <div className="toast align-items-center show" role="alert" aria-live="assertive" aria-atomic="true">
//       <div className="d-flex">
//         <div className="toast-body">
//           {props.message}
//         </div>
//         <button type="button" className="btn-close me-2 m-auto" onClick={props.onClose} aria-label="Close"></button>
//       </div>
//     </div>
//   );
// }

export default Notification;
