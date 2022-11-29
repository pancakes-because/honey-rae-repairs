
/* mostly copy/pasted from ApplicationViews.js */ 

/* don't need this anymore */ 
// import { TicketForm } from "../tickets/TicketForm" 
import { Outlet, Route, Routes } from "react-router-dom" 
import { TicketContainer } from "../tickets/TicketContainer" // importing the "TicketContainer" function from "TicketForm.js" inside the "tickets" folder
import { EmployeeList } from "../employees/EmployeeList"
import { EmployeeDetails } from "../employees/EmployeeDetails"

// reminder, we want employees to see TicketContainer
// BUT employees don't need to see the customer ticket form 
// so we can take away their access for TicketForm

// coming from NavBar.js; related to EmployeeList.js 
// we added a new link in the navbar, called "employees", that is just for employees to view and click on
// we're going to add another route for this that will help render the employee list 

// now, we want to create a new view for each employee 
// for the employee that is specified, you can see their payrate and specialty
// we'll see this reflected in the URL 
// for example, "localhost:3000/employees/1" where "1" is a specific employee's id  
// we need a new route for this! 

// now, we have our route 
// because any id number can be after "employees" in the path URL, we'll store this in a variable
// we can do this by using a : and naming the variable whatever we want 
// so this would be "employees/:" and our variable, "employeeId"
// so whenever the route matches, "employees/1" for example, "employees/"" will capture the "1" and store in an "employeeId" variable

// *** now, we can make a new component called EmployeeDetails.js ***
// this will be what our new route links to 

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
                <Route path="employees/:employeeId" element={ <EmployeeDetails /> } />
            </Route>
        </Routes>
    )
}