/* this component lets employees see a "claim" button if a ticket is unassigned */ 
/* if a tickt has already been assigned, the employee will see text saying who the ticket was assigned to */ 

// create the Ticket component first 
// cut/paste the section code from the JSX of TicketList.js 
// The JSX in TicketList.js should mostly be empty now 
// we'll have the Ticket component return this 

// we need the whole ticket object bc we're accessing the id, description, and the emergency properties on a ticket
// so it means that TicketList needs to pass this down to the child component 
// we'll use props again for this 

// *** coming from TicketList.js *** 
// in the JSX of TicketList, we use an implicit return and put "Ticket" here
// then we create a prop called "ticketObject" whose value will be the current ticket 
// reminder, "ticket" is the parameter for the callback function for .map
// so as this iterates, it will create a brand new ticket component and the prop is going to be "ticketObject" for each one
// so there will be multiple of these created 

// here is where we will deconstruct the "ticketObject" prop here 
// so now this is the variable that we can use within the scope of this component 
// so it no longer just be "ticket". we'll change these to "ticketObject"

// now, we want to make sure that link ONLY renders if the user is a customer 
// to do this, we could always copy/paste the local storage code from TicketList.js 
// but we can also use props a little more in TicketList.js 
// so in TicketList.js we took "honeyUserObject" from local storage
// and put this down in the JSX as a prop to help tell the individual ticket whether or not the user is an employee or customer
// we called the prop "isStaff" and it's value is "honeyUserObject.staff"
// so the "isStaff" prop's value will be true or false bc of the "staff" property on honeyUserObject

// main goal: add a "claim" button for unassigned tickets, and list employee name on assigned tickets 
// next, we need to deconstruct the "isStaff" prop here in Ticket.js 
// now, put the Link component inside of a ternary statement 

// now, we're modifying the JSX again to add the logic where employees see a "claim" button or employee assignment text
// so service tickets are connected to employees through the "EployeeTickets" table in our database
// so we can use the embed feature to access the employee ticket data
// so our URL now looks like this: http://localhost:8088/serviceTickets?_embed=employeeTickets 
// now, we can see that the employeeTickets array will have details where the ticket has been assigned
// so now we can think about the concept of claim button vs. assignment text as ""> 0"or "< 0"
// so anything that is greater than 0 or has a filled array should have the assignemnt text 
// anything that is less than 0 or is an empty array should have the "claim" button bc the ticket is unassigned
// *** now we update the original fetch request in TicketList.js with the new URL *** 

// we updated the original fetch request in TicketList.js with the new URL 
// so now each ticket has an employeeTickets property 
// so we can use this in the JSX of Ticket.js to conditionally render the "claim" button or assignment text
// we'll put this in the footer
// reminder, any that is less than 0 will be a truthy value while anything that is greater than 0 will be a falsy value
// so truthy will have the assignment text and falsy will have the "claim" button
// we haven't put in the employee's name for the assignment text just yet, but we will 
// now we can see this in our app 

// so now we need to get the employee's name for the tickets that have been assigned 
// *** the JSON server has one limitation: the data tables have to be directly related; see ERD for context *** 
// so to get the employee names, we need to pull in all of the employees first 
// *** so in TicketList, we need to fetch all of the employees first *** 

// we fetched the employees in TicketList.js, and we have a new prop called "employees" to pass the employees array
// reminder, the array's value is the "employees" state variable from TicketList.js
// so now we'll jam in some more code here to see if we can just get the currently assigned employee 
// this will happen if "ticketObject.employeeTickets.length" is greater than 0 
// we'll make an if...else condition out of this 
// we'll also create a variable called "assignedEmployee" with an initial value of "null"
// the array will only ever have one object, so we're just going to extract it out and store it in a variable called "ticketEmployeeRelationship"
// so now we can use the foreign key on the EmployeeTickets object to find the full Employee object; see ERD
// we'll store this in a variable called "fullEmployee"
// so the conditon is checking to see primary key on the employee match the employeeId on one of the relationship objects
// so the value is going to be an object or undefined if it's never found 
// so we actually don't need to declare a new variable, which was "fullEmployee"
// that was the point of "assignedEmployee", so we'll use this again and forget about "fullEmployee" as a whole

// since the value of assignedEmployee will either be null or an object, we can account for this back in our ticketObject ternary statement (where "Currently being worked on..." has a placeholder for the employee name)
// we're going to interpolate here
// so only if the assigned employee is not "null", meaning we've found a full employee object (bc again the whole point was to get the full name of the employee), we'll display the assigned employee's full name
// otherwise, empty string and nothing happens 
// so now the "claim" button renders when its supposed to and the employee's name shows when the ticket has been assigned

import { Link } from "react-router-dom" 

/* original code before making the link into a ternary statement */ 

// export const Ticket = ({ ticketObject, isStaff }) => {

//     return <section className="ticket" key={`ticket--${ticketObject.id}`}>
//     <header>
//         <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
//     </header>
//     <section>{ticketObject.description}</section>
//     <footer>Emergency: {ticketObject.emergency ? "🧨" : "No"}</footer>
// </section>

// }

/* updated code after making the link into a ternary statement */ 

// export const Ticket = ({ ticketObject, isStaff }) => {

//     return <section className="ticket" key={`ticket--${ticketObject.id}`}>
//     <header> 
//         {
//             isStaff
//                 ? `Ticket ${ticketObject.id}` 
//                 : <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
//         }
//     </header>
//     <section>{ticketObject.description}</section>
//     <footer>Emergency: {ticketObject.emergency ? "🧨" : "No"}</footer>
// </section>

// }

/* updated code modifying the JSX to help set up the "claim" button and assignment text */ 

export const Ticket = ({ ticketObject, isStaff, employees }) => {

    /* original code for the if... statement */ 
    // let assignedEmployee = null 
    // if (ticketObject.employeeTickets.length > 0) {
    //     const ticketEmployeeRelationship = ticketObject.employeeTickets[0]
    //     const fullEmployee = employees.find(employee => employee.id === )
    // } 

    /* updated code for the if... statement */ 
    let assignedEmployee = null 

    if (ticketObject.employeeTickets.length > 0) {
        const ticketEmployeeRelationship = ticketObject.employeeTickets[0]
        assignedEmployee= employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId )
    } 

    return <section className="ticket" key={`ticket--${ticketObject.id}`}>
    <header> 
        {
            isStaff
                ? `Ticket ${ticketObject.id}` 
                : <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
        }
    </header>
    <section>{ticketObject.description}</section>
    <section>Emergency: {ticketObject.emergency ? "🧨" : "No"}</section>
    <footer>
        {
            ticketObject.employeeTickets.length 

                // original code with placeholder for employee name information 
                // ? "Currently being worked on ..."

                // updated code without placeholder that actually displays the employee name
                ? `Currently being worked on ${assignedEmployee !== null ? assignedEmployee.user.fullName : ""}`
                : <button>Claim</button>
        }
    </footer>
</section>

}