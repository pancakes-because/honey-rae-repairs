// to help us practice props more, we are going to create a child component for "EmployeeList"
// the child component will be called "Employee". 
// bc we're dealing with props, the "Employee" function/component gets a single parameter or object in the top {}
// so we figure out what props are sent form "EmployeeList" to "Employee" when we're rendering 

// now, we can cut/paste the html section from EmployeeList and return it through Employee 
// we can see that there are three bits of information that Employee needs from EmployeeList, it's parent, to work 
// it needs three props: id, fullName, and email 
// *** we can also go back to EmployeeList and update the jsx to render something similar ***

// coming back from EmployeeList.js 
// in EmployeeList, we rendered the Employee component and its props in the jsx 
// here, in the Employee component, we need to make sure the props are passed as the object parameter
// *** we also need a unique key for each prop in EmployeeList, so we're going back there ***
// bc we have a unique key in Employee list, the parent, we can remove it from Employee
// *** to recap, we're building multiple components in EmployeeList which is rendering the Employee section for us. *** 
// *** just a good example of an alternate way to use props; having one component render the details of another is good for scalability or anything that can get complex ***

/* original code */

// export const Employee = ({ id, fullName, email }) => {

//     return <section className="employee" key={`employee--${id}`}>
//         <div>Name: {fullName}</div>
//         <div>Email: {email}</div>
//     </section>

// }

/* updated code where key was removed */ 

// export const Employee = ({ id, fullName, email }) => {

//     return <section className="employee">
//         <div>Name: {fullName}</div>
//         <div>Email: {email}</div>
//     </section>

// }

// now that we have useParams() set up in EmployeeDetails to extract the employee id 
// we're going to use the name of the employee and make a link component 
// we're taking the name of employee and hyperlinking it 
// then change the route to "employees/"" and then whatever the primary key of that employee is 
// so if we go to our employee list view in the browser, we can click on their names and be taken to a new page to see their details 
// don't forget to import the link from react-router-dom

/* updated code for link */ 

import { Link } from "react-router-dom"

export const Employee = ({ id, fullName, email }) => {

    return <section className="employee">
        <div>
            <Link to={`/employees/${id}`}>Name: {fullName}</Link>
        </div>
        <div>Email: {email}</div>
    </section>
}

