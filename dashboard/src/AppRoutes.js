
import { Routes, Route } from "react-router-dom";
import Dashboard from './app/dashboard';
import Contact from './app/contact-us/Contact';
import Careers from './app/careers/Careers';
import Jobs from './app/jobs/Jobs';
import AddJob from "./app/jobs/AddJob";
import EditJob from "./app/jobs/EditJob";

function AppRoutes(){
    return(
      <>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/inquires" element={<Contact/>} />
          <Route path="/careers" element={<Careers/>} />
          <Route path="/jobs" element={<Jobs/>} />
          <Route path="/add-job" element={<AddJob/>} />
          <Route path="/edit-job/:id" element={<EditJob/>} />
        </Routes>
      </>
    )
}

export default AppRoutes