// we want to create a new view for each employee 
// for the employee that is specified, you can see their payrate and specialty
// we have a route for this in the EmployeeViews component 

// EmployeeDetails will be the component that provides the details
// this component should be displayed when the route matches "employees/" with a number 
// *** so we'll reference this in the route in EmployeeViews ***

// coming back from EmployeeViews.js 
// inside the fragment in EmployeeDetails, we will capture the employee's id number 
// so we're just extracting it from EmployeeViews 
// *** the hook in react-router-dom is called useParams ***
// we're going to deconstruct it here 
// what react-router-dom is that it takes anything in the URL and puts that in an object 
// so we can deconstruct the employeeId variable we defined in the route in EmployeeViews 
// then equal it to useParams(), so we can extract whatever we define here. 

// since we want to display all the details about the employee, we need a state variable for employee too
// *** now we go to the Employee.js component *** 
// employeeId is the state we're getting through the route in EmployeeViews 
// we want to observe employeeId, so we need a useEffect() here

// now we need to fetch all of the information with a fetch call 
// we want information from the users table, employees table, and we want to see all the tickets assigned to the employee
// we can use the _expand query string parameter to pull in the user information
// here's the URL: http://localhost:8088/employees?_expand=user
// so for every employee, it has a user key that gets us the fullName and email 
// so we get this in addition to whatever properties the employee table has (like speciality for example)
// to get the ticket information we want, we can add the _embed query to our URL
// so we end up with this: http://localhost:8088/employees?_expand=user&_embed=employeeTickets
// employeeTickets is an array with items in it 
// reminder, the number in our localhost:3000/employees/whatevernumber URL is the userId not the employeeId 
// so we can filter down through what we fetched in the API to make sure the userId matches with the employeeId
// to do this, we can add another & and ask for userId to equal whatever number want
// so the URL now looks like this: http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=4
// the user information is also an array because we've filtered down to get this information
// so now we pop this into our fetch call, but the employeeId variable interpolated where the number would go for userId
// so the array is what we're receiving back from API, so we'll capture that and name this "data"
// the variable "singleEmployee" is extracting what we want from the array, so it's position 0
// then we update our state with singleEmployee, our object 

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const EmployeeDetails = () => {
    
    const { employeeId } = useParams()
    const [ employee, updateEmployee ] = useState({})


    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleEmployee = data[0]
                    updateEmployee(singleEmployee)
                }) 
            
        },
        [employeeId]
    )

    // now we can render the details for each employee in the jsx 
    // in the header, we want to show the employee's name 
    // on the employee object, we have to go to .user and then .fullName
    // *** we know this by looking at the state in dev tools
    // so we end up with employee.user.email 
    // we can do the same thing for the email div to get employee.user.email
    // for specialty and rate, these properties are directly on the employee object
    // so i can just do employee.speciality and employee.rate
    // then in the footer, I want to show how many tickets the employee is working on
    // employeeTickets property is directly on the employee object, so we can do employee.employeeTickets

    // *** react rule: it does not like accessing properties within properties ***
    // we see this when errors are thrown for fullName and email
    // *** we can bypass this with optional chaining *** 
    // *** optional chaining is done with ? meaning that it will only go down this path if the properties exists ***
    // *** make sure to include an empty object, {}, in our employee state *** 

    // we still have some errors 
    // employeeTickets is an array and underlying an array is an object 
    // we want to display the length of the array, so we need the .length method 
    // we also need optional chaining here because we're going two properties deep with employee.employeeTickets
    
    // now, we can move onto to some styling with the header and footer in Employees.css 
    // adding a class name 


        return <section className="employee">
        <header className="employee__header">{employee?.user?.fullName}</header>
        <div>Email: {employee?.user?.email}</div>
        <div>Speciality: {employee.specialty}</div>
        <div>Rate: {employee.rate}</div>
        <footer className="employee__footer">Currently working on {employee?.employeeTickets?.length} tickets</footer>
    </section>
}
