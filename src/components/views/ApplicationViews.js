/* original code */ 

// export const ApplicationViews = () => {
// 	return <>
// 		<h1 className="title--main">Honey Rae Repairs</h1>
// 		<div>Your one-stop shop for repairing your tech</div>
// 	</>
// }

/* updated code */ 

// this is supposed to render the <TicketList> component. 
// we do that with a <Route> component.

/* *** the outlet, route, routes, ticketform, and ticketcontainer were for the original the new code *** */ 
// import { Outlet, Route, Routes } from "react-router-dom" 
// import { TicketForm } from "../tickets/TicketForm" 
// import { TicketContainer } from "../tickets/TicketContainer" 

// *** don't need to import TicketList and TicketSearch since we're importing TicketCOntainer ***
// import { TicketList } from "../tickets/TicketList" 
// import { TicketSearch } from "../tickets/TicketSearch" 


import { CustomerViews } from "./CustomerViews"
import { EmployeeViews } from "./EmployeeViews" 

{/* *** making a new component called "TicketContainer.js" *** */}
{/* this will make up the parent component that contains TicketSearch and TicketList, so they can share state */}
{/* the parent is what lets them communicate with each other; react rule: child components get state from a parent component */}

{/* now, we want to change our views */}
{/* we want employees to see the TicketContainer view, which has the search field  */}
{/* customers should only see the TicketList view, so NOT including the search field  */}
// *** to do this, we're creating two new components to represent two new views *** 
// *** these will be called "CustomerViews.js" and "Employee Views.js" *** 

/* BIG CHANGE: READ THIS */ 
// we're going to modify <Outlet> and check if the user is an employee or customer 
// *** so we're going to drastically change our ApplicationViews code now ***
// *** so comment this original code out *** 
// *** look at the updated code block under this next big code blog  ***

/* original ApplicationViews code before CustomerViews.js and EmployeeViews.js were created */ 

// export const ApplicationViews = () => {
// 	return (
//         <Routes>
//             <Route path="/" element={
//                 <>
//                     <h1>Honey Rae Repair Shop</h1>
//                     <div>Your one-stop-shop to get all your electronics fixed</div>

//                     <Outlet />
//                 </>
//             }>

//                 {/* original code  */}
//                 {/* <Route path="tickets" element={ <TicketList /> } /> */}

//                 {/* updated code */}
//                 {/* this will be the parent component handling both the child TicketList and TicketSearch routes  */}

//                 {/* <Route path="tickets" element={
//                     <>
//                         <TicketSearch /> 
//                         <TicketList /> 
//                     </>
//                 }>  */}

//                 {/* updated code  */}
//                 {/* this route functions the same as above */}
//                 {/* TicketContainer is holding TicketSearch and TicketList  */}
                
//                 <Route path="tickets" element={ <TicketContainer /> } /> 

//                 <Route path="ticket/create" element={ <TicketForm /> } /> 
//             </Route>
//         </Routes>
//     )
// }

/* updated code after */ 

// so now, with a clean slate, we're going to copy/paste our user and local stroage code from TicketList.js
/* we have also just imported our CustomerViews and EmployeeViews functions */ 
/* *** this makes our other imports obsolete now, so we can comment those out as well *** */ 

export const ApplicationViews = () => {

    const localHoneyUser = localStorage.getItem("honey_user") 
    const honeyUserObject = JSON.parse(localHoneyUser)

        if (honeyUserObject.staff) {
            // Return employee views 
            return <EmployeeViews /> 

        } 
        else { 
            // Return customer views 
            return <CustomerViews /> 

        }
}