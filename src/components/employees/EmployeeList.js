// goal: put a new link called "employees" in the nav bar 
// logged in as an employee, clicking on the link will show a list of employees 
// customers cannot see this 

import { useEffect, useState } from "react"
import "./Employees.css"

// here's our plan... 
// we have our EmployeeList function here 
// the EmployeeList function should set its initial state
// then in the initial state useEffect, we will fetch all of the employees from the API and pull them in
// then in the jsx, we will render the names and email addresses of employees... to start 

// we set up our state variable, "employees" as the initial state with "setEmployees" as the setter function.
// then we have our useEffect, which observes when our first initial state is done
// then it will go fetch permanent state via {}, and then update our component state via []
// we have our fetch call that will let us grab all objects in the "users" array - all the users
// but we only want users who are staff, so those with a property of "isStaff: true"
// *** the way we do this is with query string parameters via the browser URL *** 
// *** this our URL including the query string http://localhost:8088/users?isStaff=true *** 
// *** then we put this in as the URL of our fetch call *** 
// then we want to parse back into javascript and we'll call it "employeeArray"
// and then we'll update our state variable accordinly with employeeArray using "setEmployees"

// then we'll move onto our jsx now 
// we will iterate over the "employees" array
// so for every employee, we'll have an html article containg a section that contains a separate divs for their name and email
// reminder, we need a "key" that holds the employee's id in the section. javascript interpolates employee.id. 
// so, all together, this will display a list of employees 

// now, we need a new nav bar item 
// *** we'll go to our NavBar.js component/module for this *** 
// now, we've made our navbar link for employees 

// but customers can still see it, so we need to hide it from them 
// *** easiest way to do this is to make separate nav views for customers and employees ***
// *** so we've made the "EmployeeNav.js" and "CustomerNav.js" components in the "nav" folder ***

export const EmployeeList = () => {

    const [employees, setEmployees] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/users?isStaff=true`)
                .then(response => response.json())
                .then((employeeArray) => {
                    setEmployees(employeeArray)
                }) 
        },
        []
    )

    return <article className="employees">
        {
            employees.map(employee => {
                return <section className="employee" key={`employee--${employee.id}`}>
                    <div>Name: {employee.fullName}</div>
                    <div>Email: {employee.email}</div>
                </section>
            })
        }
    </article>
} 