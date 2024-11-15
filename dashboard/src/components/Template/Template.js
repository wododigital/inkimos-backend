import React from 'react'
import './styleHeader.css'
import HeaderNav from './HeaderNav';
import SideNav from './SideNav';

function Template({ currentpage, children }) {

    return (
        <>
            <div className='YellowBackgroundNew'>
                <HeaderNav/>
                <SideNav current_page={currentpage}/>
                <div className='ContentSpace'>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Template