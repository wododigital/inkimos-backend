
import '../index.css'
import { Home, LogOut, Contact, Users} from "lucide-react";
import { SidebarItem } from "./sidebar/SidebarItem";
import Sidebar from "./sidebar/Sidebar";

function Header(){
    return(
        <Sidebar>
            <SidebarItem
                icon={<Home size={20} />}
                text="Dashboard"
                id="dashboard"
            />
           
            

            <SidebarItem
                icon={<Contact size={20} />}
                text="Inquires"
                id="inquires"
            />

            <SidebarItem
                icon={<Users size={20} />}
                text="Careers"
                id="careers"
            />

          

            
            <hr className="my-3" />
           
            <SidebarItem
                icon={<LogOut size={20} />}
                text="Logout"
                id="logout"
            />
        </Sidebar>
    )
}

export default Header;