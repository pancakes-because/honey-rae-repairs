
/* mostly copy/pasted from ApplicationViews.js */ 

import { Outlet, Route, Routes } from "react-router-dom" // don't know what "react-router-dom" is, figure out later
import { TicketForm } from "../tickets/TicketForm" // importing the "TicketForm" function from "TicketForm.js" inside the "tickets" folder
import { TicketList } from "../tickets/TicketList"
import { Profile } from "../profile/Profile"

// don't need this anymore... 
import { TicketContainer } from "../tickets/TicketContainer" // importing the "TicketContainer" function from "TicketForm.js" inside the "tickets" folder

// reminder, we do NOT want customers to see TicketContainer
// we only want them to see the TicketList 
// bc of this, we can replace TicketContainer with TicketList

export const CustomerViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to get all your electronics fixed</div>

                    <Outlet />
                </>
            }> 

                 {/* creating this for the profile link/view  */}
                 <Route path="profile" element={ <Profile /> } />  

                {/* original code  */}
                {/* <Route path="tickets" element={ <TicketContainer /> } />  */}

                {/* updated code */}
                <Route path="tickets" element={ <TicketList /> } /> 

                <Route path="ticket/create" element={ <TicketForm /> } /> 
            </Route>
        </Routes>
    )
}