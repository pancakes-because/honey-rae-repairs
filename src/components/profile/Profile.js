/* we'll mostly steal what we did in NavBar.js to start */ 
// we'll leave an empty fragment to be returned by if and else conditions for now

// *** now, we go back to EmployeeViews.js *** 
// there, we'll go to the route we made earlier and fill in the name as "Profile"
// *** coming from "EmployeeForm.js" and "CustomerForm.js" 

import { EmployeeForm } from "./EmployeeForm"
import { CustomerForm } from "./CustomerForm"

export const Profile = () => {
    
    const localHoneyUser = localStorage.getItem("honey_user") 
    const honeyUserObject = JSON.parse(localHoneyUser)

        if (honeyUserObject.staff) {
            return <EmployeeForm />

        } 
        else { 
            return <CustomerForm/>

        }
}