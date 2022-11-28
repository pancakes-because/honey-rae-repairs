/* original code */ 

// export const TicketList = () => {
//     return <h2>List of Tickets</h2>
// }

// react has a function named useState() to store the state in a component.
// the function returns an array. 
// "tickets" has a value of an empty array. it holds the intial state value at index 0
// "setTickets" has a value of a function. this function modifies the state at index 1.

// react also provides a function named useEffect() to observe state. 
// it allows you to observe state and run some instructions when state changes.
// since the useState function performs the first change in state, you can observe that.

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom" // importing from react-router-dom, so navigate feature works for customer "create ticket" button
import "./Tickets.css" // importing from Tickets.css so we can apply the styles to TicketList.css 

/* updated code */ 

// *** coming from TicketContainer.js *** 
// we have a new search input field that employees can type search terms into and get a list of tickets that match
// *** we're deconstructing the "searchTermsState" prop from TicketContainer.js *** 
// *** reminder, this is the key. and the value is the actual state from the parent, the search terms themselves ***
// *** so it is a state of this component; it's not the direct state variable, but it's inherited from the parent ***
// we can also observe this! so we can have another useEffect here

export const TicketList = ({ searchTermState }) => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFiltered] = useState([])

    // "emergency" is the variable tracking the initial state of whether emergency tickets shoudl be shown ONLY when the "emergency only" button is clicked
    // "setEmergency" is the variable that changes the state, so only emergency tickets are shown when the "emergency only" button is clicked
    // by default, we don't want only the emergency tickets to show, so the default or initial state of emergency is "false"
    const [emergency, setEmergency] = useState(false)

    // "onlyOnly" is the variable tracking the initial state of whether open tickets should be shown ONLY when the "open tickets" button is clicked
    // "updateOpenOnly" is the setter function or variable that changes the state, so only open tickets are shown when the "open tickets" button is clicked
    // by default, we don't want only the open tickets to show, so the default or initial state of openOnly is "false"
    const [openOnly, updateOpenOnly] = useState(false)

    // navigate is a variable/"feature" tied to the "create ticket" button 
    // it is imported from react-router-dom; see import statement near top 
    // ***it is needed for the navigation ability to happen***
    // it helps route customers to our ticket form after clicking the "create ticket" button
    const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user") 
    const honeyUserObject = JSON.parse(localHoneyUser)

      // this useEffect() is for observing the state of the search input field we have for employees
    // can have a console.log here just to check things out in your browser
    // there, we can more easily see that TicketList is observing when the parent's searchTermState is changing
    // now, the final step -- like the instructions in my call back function say -- anytime the searchTermsState changes, we want to filter the list of tickets again 
    // for now, to keep it simple, the way we can think about this is, "does the ticket start with whatever the user typed in?" -- then show ticket results based on that
    // so now we need another filter state variable
    // *** this is filtering the original ticket list we had from the API; we're constantly modifying how we filter things *** 
    // so, we end up having a new variable called "searchedTickets" that stores our logic saying that we want to filter our tickets and see if the description starts with whatever the user typed in
    // this returns an array to us
    // filteredTickets is the state we're displaying here, so that's the one to update. we can use setFilterd for that.

    
    useEffect(
        () => {
            const searchedTickets = tickets.filter(ticket => ticket.description.startsWith(searchTermState))
            setFiltered(searchedTickets)
        },
        [searchTermState]
    )

    // this useEffect()  only emergency tickets show when the "emergency only" button is clicked
    // it observes the state of emergency 
    // if emergency is "true", then we want to take the original tickets array and filter through each ticket 
    // so we will return every ticket that has "true" for emergency in the jsx 
    // we're storing this in a variable called "emergencyTickets" 
    // then we're setting the state with this variable 

    // we added a "show all" button, which should display all tickets when clicked 
    // to make sure this happens, we added an "else" condition to show all tickets 
    
    useEffect(
        () => {
            if (emergency) {
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFiltered(emergencyTickets)
            }
            else {
                setFiltered(tickets)
            }
        },
        [emergency]
    )

    // this useEffect() is getting all of of the tickets from the database to begin with 

    useEffect(
        () => {
            // View the initial state of tickets
            // console.log("Initial state of tickets", tickets) 
            fetch(`http://localhost:8088/serviceTickets`)
            .then(response => response.json())
            .then((ticketArray) => {
                setTickets(ticketArray)
            })

        },
        [] // When this array is empty, you are observing initial component state
    )

    // now, we want to get the tickets that belong to the customer and show these when they login 
    // when employees login, they should see ALL tickets. when customers login, they should only see THEIR tickets. 
 
    // the "localHoneyUser" variable stores what we are grabbing out fo local storage, "honey_user", which is a string 
    // the "honeyUserObject" converting the honey user string into an object 
    // honeyUserObject also has the "staff" key on it 

    // we need to observe when the "tickets" state variable changes for this, so need a new useEffect()
    // to help with this, we also need to write a condition that 
    // a - determines what tickets to show when employees login 
    // b - determines what tickets to show when customers login 
    
    // "filteredTickets" is a state variable that holds an empty array 
    // "setFiltered" is a state variable will be used to change the state for the tickets again 
    // we have an if..else statement that looks at the staff property on honeyUserObject 
    // if the staff property is "true", meaning the user is an employee, then we set the state to show all tickets

    // if the staff property is "false", meaning the user is a customer, we will filter through all the tickets
    // if the "userId" on the ticket matches the "id" on honeyUserObject, then show these tickets 
    // the "myTickets" variable stores this 
    // then we set myTickets as the state, so customers only see their tickets when they login 

    // this useEffect() observes state for the login and decides what tickets are shown to employees vs. users 

    useEffect(
        () => {
            // in dev tools, should show an empty object for the initial state first
            // then we would see a second object with data for when the ticket data was fetched after initial state
            // console.log(tickets)

            if (honeyUserObject.staff) {
                // for employees
                setFiltered(tickets)
            }
            else {
                // for customers  
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)

            }
        },
        [tickets]
    )

    // this useEffect is observing the state of "openOnly", which will help us know when the "open tickets" button is clicked
    // we have a call back function which will contain the instructions, () => {}
    // we have an array that will observe "openOnly"
    // now, we write in the logic 
    // if "openOnly" is true, we filter down the tickets and update the filtered state variable - just like we did with setFiltered(myTickets) above
    // but the condition is different, bc we want to filter the open tickets for the customer/user and any of their tickets that have an empty string for "dateCompleted" 
    // we have a variable called "openTicketArray" to store this 

    useEffect(
        () => {
            if (openOnly) {
                const openTicketArray = tickets.filter(ticket => {
                    return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
                })
                setFiltered(openTicketArray)
            } 
            else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [openOnly]
    )

/* original code */ 

//     return <>
    
//     <h2>List of Tickets</h2>
//         <article className="tickets">
//             {
//                 tickets.map(
//                     (ticket) => {
//                         return <section className="ticket">
//                             <header>{ticket.description}</header>
//                             <footer>Emergency: {ticket.emergency ? "🧨" : "No"}</footer>
//                         </section>
//                     }
//                 )
//             }
//         </article>
//     </> 
// }

/* updated code */ 

// filteredTickets is our new inital state
// so the when the fetch request kicks in, it will grab all tickets from the api 
// but when the state changes, when the user logs in, the tickets are filtered 
// they are filtered to either show all tickets for employees
// or to show the customer's own tickets for the customer 

// in dev tools, we were getting an error saying, "Each child in a list should have a unique key prop"
// to fix this, we added key={`ticket--${ticket.id}`}, so each ticket has it's id attached to it 

// added a button called "emergency only" in our jsx 
// this will be used when employees want to see emergency tickets only 
// we want to change the state to "true" when the button is clicked, so we have a onClick function for this 
// we can see this change using dev tools 

// right now, the "emergency only" button displays for both employees and customers 
// we want to change this, so that the button displays for employees ONLY 
// to do this, we copied the code for the button and made ternary statement out of it 
// so if an employee logs in, honeyUserObject.staff being "truthy" or true, then show the button. 
// otherwise, for customers, print an empty string which equals to nothing -- so no button shows for customers 

/* original code before making ternary statement from button */ 

// return <>

// <h2>List of Tickets</h2>
//     <button
//         onClick ={
//             () => {
//                 setEmergency(true)
//             }
//         }
//         >Emergency Only</button>
//     <article className="tickets">
//         {
//             filteredTickets.map(
//                 (ticket) => {
//                     return <section className="ticket" key={`ticket--${ticket.id}`}>
//                         <header>{ticket.description}</header>
//                         <footer>Emergency: {ticket.emergency ? "🧨" : "No"}</footer>
//                     </section>
//                 }
//             )
//         }
//     </article>
// </> 
// }

/* updated code after making a ternary statement out of the button code */ 

// now, we're adding a "show all" button to display all tickets for employees
// this is to let employees click between the "emergency only" and "show all" buttons, so they can switch between seeing emergency tickets only and seeing their full ticket list
// we can create another button and ternnary statement for this
// reminder, "setEmergency(false)" is the state where see emergency tickets only when the "emergency only" button is clicked
// so to see all tickets when the "show all" button is cilcked, we can set the state as "setEmergency(false)" 
// since we now have two button components, we need to put all of the button code in its own fragment; react rule 

// above the list of tickes, we're making a  "create ticket" button that ONLY customers can see 
// when the customer clicks it, the navigate feature from react-router-dom will route them to a new route in the browser
// when the customer clicks it, we are changing the route to "/ticket/create" 
// this will be a new page with a form that creates a ticket in the ticket list view; the form input fields are in "TicketForm.js"
// after they fill out the form, they will be routed back to the ticket list to see the new ticket they just made 

// now, we want to create a "open tickets" button that can ONLY be seen by customers 
// this should show service tickets that don't have a "dateCompleted" value
// so we create a fragment in th jsx to group this with the "create ticket" button
// similar to employees, where we set a state variable and component for emergency and non-emergency tickets, we'll create another state variable for open and closed tickets.
// the initial state variable is "openOnly" and the setter function to change the state is "updateOpenOnly"; see above 
// down here in the jsx, we'll set updateOpenOnly to "true" when the button is clicked, so it shows open tickets like we want.
// and because a state variable is changing when the button is clicked, we need to observe the state variable changing, so we need a useEffect() whose job it is is to observe state
// we made the useEffect, so we're all set here! 

// now, we want to create a "all my tickets" button to show all the customer's tickets and set the state variable back to false
// so we add this in the jsx. reminder, only open tickets should be shown when updateOpenOnly is "true"
// to see all tickets, we can set updateOpenOnly to "false"
// now we go back and update the useEffect that was observing "updateOnly" with an else condition
// reminder, we the "myTickets" variable is storing the customer's tickets, so we can use this with "setFiltered" to show that 
// so we can steal some of the login from the first useEffect basically

// now, we're going to share state between two components with props (which are like arguments to functions)
// when there are two sibling components, they cannot share state. 
// you have to make a parent component that contains both of them, and then both child components share state between them. 
// we're going to do this with adding a search input field for tickets for employees ONLY. 
// this will let the employee type in the description of ticket and receive a list of tickets matching what they typed in.
// so we need to create a parent component containing both the input field and the list of tickets.
// ***so create a new component or module called "TicketSearch.js"***

return <>

{
    honeyUserObject.staff 
    ? <>
        <button onClick ={ () => { setEmergency(true) } } >Emergency Only</button>
        <button onClick ={ () => { setEmergency(false) } } >Show All</button>
    </> 
    : <>
        <button onClick={() => navigate("/ticket/create")}>Create Ticket</button> 
        <button onClick={() => { updateOpenOnly(true) } }>Open Tickets</button> 
        <button onClick={() => { updateOpenOnly(false) } }>All My Tickets</button> 
    </> 
}

<h2>List of Tickets</h2>

    <article className="tickets">
        {
            filteredTickets.map(
                (ticket) => {
                    return <section className="ticket" key={`ticket--${ticket.id}`}>
                        <header>{ticket.description}</header>
                        <footer>Emergency: {ticket.emergency ? "🧨" : "No"}</footer>
                    </section>
                }
            )
        }
    </article>
</> 
}
