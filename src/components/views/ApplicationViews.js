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

import { Outlet, Route, Routes } from "react-router-dom" // don't know what "react-router-dom" is, figure out later
import { TicketList } from "../tickets/TicketList" // importing the "TicketList" function from "TicketList.js" inside "tickets" folder
import { TicketForm } from "../tickets/TicketForm" // importing the "TicketForm" function from "TicketForm.js" inside the "tickets" folder
import { TicketSearch } from "../tickets/TicketSearch" // importing the "TicketSearch" functin from the "TicketSearch.js" inside the "tickets" folder
import { TicketContainer } from "../tickets/TicketContainer"

export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to get all your electronics fixed</div>

                    <Outlet />
                </>
            }>

                {/* original code  */}
                {/* <Route path="tickets" element={ <TicketList /> } /> */}

                {/* updated code */}
                {/* this will be the parent component handling both the child TicketList and TicketSearch routes  */}

                {/* <Route path="tickets" element={
                    <>
                        <TicketSearch /> 
                        <TicketList /> 
                    </>
                }>  */}

                {/* updated code  */}
                {/* this route functions the same as above */}
                {/* TicketContainer is holding TicketSearch and TicketList  */}
                
                <Route path="tickets" element={ <TicketContainer /> } /> 

                <Route path="ticket/create" element={ <TicketForm /> } /> 
            </Route>
        </Routes>
    )
}

{/* *** making a new component called "TicketContainer.js" *** */}
{/* this will make up the parent component that contains TicketSearch and TicketList, so they can share state */}
{/* the parent is what lets them communicate with each other; react rule: child components get state from a parent component */}


