
import React from 'react'
import { RiseLoader } from 'react-spinners';

const PageLoader = () => {
  return (
    <div className='z-50 fixed top-0 left-0 w-full h-full bg-white flex justify-center items-center'><RiseLoader color="#0055FF" loading='true' size={36} /></div>
  )
}

export default PageLoader