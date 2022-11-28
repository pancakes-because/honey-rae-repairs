
/* mostly copy/pasted from ApplicationViews.js */ 

import { Outlet, Route, Routes } from "react-router-dom" // don't know what "react-router-dom" is, figure out later
import { TicketForm } from "../tickets/TicketForm" // importing the "TicketForm" function from "TicketForm.js" inside the "tickets" folder
import { TicketContainer } from "../tickets/TicketContainer" // importing the "TicketContainer" function from "TicketForm.js" inside the "tickets" folder


export const EmployeeViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to get all your electronics fixed</div>

                    <Outlet />
                </>
            }>
                
                <Route path="tickets" element={ <TicketContainer /> } /> 

                <Route path="ticket/create" element={ <TicketForm /> } /> 
            </Route>
        </Routes>
    )
}