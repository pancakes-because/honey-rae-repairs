
/* mostly copy/pasted from ApplicationViews.js */ 

import { Outlet, Route, Routes } from "react-router-dom" // don't know what "react-router-dom" is, figure out later
import { TicketForm } from "../tickets/TicketForm" // importing the "TicketForm" function from "TicketForm.js" inside the "tickets" folder
import { TicketContainer } from "../tickets/TicketContainer" // importing the "TicketContainer" function from "TicketForm.js" inside the "tickets" folder
import { EmployeeList } from "../employees/EmployeeList"

// reminder, we want employees to see TicketContainer
// BUT employees don't need to see the customer ticket form 
// so we can take away their access for TicketForm

// coming from NavBar.js; related to EmployeeList.js 
// we added a new link in the navbar, called "employees", that is just for employees to view and click on
// we're going to add another route for this that will help render the employee list 

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

                {/* employees don't need this */}
                {/* <Route path="ticket/create" element={ <TicketForm /> } />  */} 

                <Route path="employees" element={ <EmployeeList /> } />

            </Route>
        </Routes>
    )
}