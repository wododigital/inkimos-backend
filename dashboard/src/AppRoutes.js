
import { Routes, Route } from "react-router-dom";
import Dashboard from './app/dashboard';
import Contact from './app/contact-us/Contact';
import Careers from './app/careers/Careers';

function AppRoutes(){
    return(
      <>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/inquires" element={<Contact/>} />
          <Route path="/careers" element={<Careers/>} />
        </Routes>
      </>
    )
}

export default AppRoutes