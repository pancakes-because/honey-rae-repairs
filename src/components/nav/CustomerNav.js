/* mostly copy/pasted from NavBar.js */ 

import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

// reminder, we don't want customers to see the "employees" link
// so we can remove this part 

export const CustomerNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/tickets">Tickets</Link>
            </li>

            {/* dont' need this for customers  */}
            {/* <li className="navbar__item active">
                <Link className="navbar__link" to="/employees">Employees</Link>
            </li> */} 

            {/* need this to make profile link for customers */}
            <li className="navbar__item active">
                <Link className="navbar__link" to="/profile">Profile</Link>
            </li> 
            
            {
                localStorage.getItem("honey_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("honey_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}