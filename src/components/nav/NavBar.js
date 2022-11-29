
// was for the original code, so don't need this anymore for the updated code 
// import { Link, useNavigate } from "react-router-dom" 

import { EmployeeNav } from "./EmployeeNav"
import { CustomerNav } from "./CustomerNav"
import "./NavBar.css"

// coming from EmployeeList.js 
// we added a new link in the navbar, called "employees", that is just for employees to view and click on
// now, we'll go to the EmployeeViews.js component and make a route for the employees link there 

{/* now, we're changing our views */}
{/* we want employees to see a version of the navbar with the "employees" link in it */}
{/* meanwhile, we want customers to see another version of the navbar that does NOT have the "employees" link in it */}
// *** to do this, we're creating two new components to represent two new views *** 
// *** these will be called "CustomerNav.js" and "EmployeeNav.js" *** 

/* BIG CHANGE: READ THIS */ 
// *** so we're going to drastically change our NavBar code now ***
// *** so comment this original code out *** 
// *** look at the updated code block under this next big code blog  ***

/* original code */ 

// export const NavBar = () => {
//     const navigate = useNavigate()

//     return (
//         <ul className="navbar">
//             <li className="navbar__item active">
//                 <Link className="navbar__link" to="/tickets">Tickets</Link>
//             </li>
//             <li className="navbar__item active">
//                 <Link className="navbar__link" to="/employees">Employees</Link>
//             </li>
//             {
//                 localStorage.getItem("honey_user")
//                     ? <li className="navbar__item navbar__logout">
//                         <Link className="navbar__link" to="" onClick={() => {
//                             localStorage.removeItem("honey_user")
//                             navigate("/", {replace: true})
//                         }}>Logout</Link>
//                     </li>
//                     : ""
//             }
//         </ul>
//     )
// }

/* updated code */ 

export const NavBar = () => {
    
    const localHoneyUser = localStorage.getItem("honey_user") 
    const honeyUserObject = JSON.parse(localHoneyUser)

        if (honeyUserObject.staff) {
            // Return employee views 
            return <EmployeeNav /> 

        } 
        else { 
            // Return customer views 
            return <CustomerNav /> 

        }
}

// for this new updated code, we're pretty much copying the updated code from ApplicationViews.js now
// we did change the names to "EmployeeNav" and "CustomerNav"