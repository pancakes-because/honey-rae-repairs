
/* mostly copy/pasted from ApplicationViews.js */ 

/* don't need this anymore */ 
// import { TicketForm } from "../tickets/TicketForm" 
import { Outlet, Route, Routes } from "react-router-dom" 
import { TicketContainer } from "../tickets/TicketContainer" // importing the "TicketContainer" function from "TicketForm.js" inside the "tickets" folder
import { EmployeeList } from "../employees/EmployeeList"
import { EmployeeDetails } from "../employees/EmployeeDetails"
import { CustomerList } from "../customers/CustomerList"
import { CustomerDetails } from "../customers/CustomerDetails"
import { Profile } from "../profile/Profile"

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

// goal: create a profile link for employees, and allow them to edit their profiles 
// first, we need a new link called "Profile" 
// *** we created this in NavBar.js and now we're here *** 
// it should be rendered when a specific URL is in the browser, so we need a new route too
// we're creating the route here; we only have an empty fragment in the element for now
// bc of this, the profile link does nothing when you click on it 
// *** spoiler alert: i will need to put in a profile link for customers; customers have different info. ***
// *** this means that depending on who the user is, a different form is seen *** 
// *** so we'll follow the same process we did for ApplicationViews.js and for the NavBars
// *** reminder, so this is where we look for the staff key on the object for local storage and render either the employee or customer form *** 

// *** create a new folder called "profile" ***
// we're going to create the starter of all three of those components ***
// one does the handling of checking if staff or not, and then one for each of the forms 
// *** these will be called Profile.js, CustomerForm.js, and EmployeeForm.js ***
// *** we'll start on Profile.js first, so go there *** // 
// *** coming back from Profile.js after making a component there *** 
// renamed the route we made to "Profile" now, so it matches "Profile.js"
// don't forget to import this above! 


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
                {/* creating this for the profile link/view  */}
                <Route path="profile" element={ <Profile /> } /> 

                <Route path="tickets" element={ <TicketContainer /> } /> 

                {/* employees don't need this */}
                {/* <Route path="ticket/create" element={ <TicketForm /> } />  */} 

                <Route path="employees" element={ <EmployeeList /> } />
                <Route path="employees/:employeeId" element={ <EmployeeDetails /> } />

                {/* information for customer nav link and customer details  */}

                <Route path="customers" element={ <CustomerList /> } />
                <Route path="customers/:customerId" element={ <CustomerDetails /> } />
            </Route>
        </Routes>
    )
}