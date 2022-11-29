// goal: put a new link called "employees" in the nav bar 
// logged in as an employee, clicking on the link will show a list of employees 
// customers cannot see this 

import { useEffect, useState } from "react"
import { Employee } from "./Employee"
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

// to help us practice props more, we are going to create a child component for "EmployeeList"
// the child component will be called "Employee". 
// *** we're heading over to Employee.js component now *** 

/* original code before Employee prop existed */ 

//     return <article className="employees">
//         {
//             employees.map(employee => {
//                 return <section className="employee" key={`employee--${employee.id}`}>
//                     <div>Name: {employee.fullName}</div>
//                     <div>Email: {employee.email}</div>
//                 </section>
//             })
//         }
//     </article>
// } 

/* updated code after Employee prop exists */ 

    return <article className="employees">
        {
            // original code without key 
            // employees.map(employee => <Employee id={employee.id} fullName={employee.fullName} email={employee.email} /> 

            // updated code with key 
            employees.map(employee => <Employee key={`employee--${employee.id}`}
                id={employee.id} 
                fullName={employee.fullName} 
                email={employee.email} /> )
        }
    </article>
} 

// coming from EmployeeList.js 
// so we're putting in the Employee component here 
// we're also making the jsx render the props (id, fullName, email) related to Employee 
// then we're putting the property information in (employee.id, employee.fullName, employee.email)
// *** remember to import the "Employee" component here ***
// *** make sure you go back to Employee.js and desconstruct the props ***

// we deconstructed the props and passed them as object parameters in the Employee component 
// now, we need to add a unique key to where employee is being rendered in EmployeeList 
// *** now go back to the child component, Employee, and remove the key there ***

// coming back from Employee.js 
// now, that we've removed the key from Employee
// *** to recap, we're building multiple components in EmployeeList which is rendering the Employee section for us. *** 
// *** just a good example of an alternate way to use props; having one component render the details of another is good for scalability or anything that can get complex ***