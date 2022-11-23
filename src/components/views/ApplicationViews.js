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

                <Route path="tickets" element={ <TicketList /> } />
            </Route>
        </Routes>
    )
}