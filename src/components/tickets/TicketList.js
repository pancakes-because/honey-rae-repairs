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
import "./Tickets.css" // importing from Tickets.css so we can apply the styles to TicketList.css 

/* updated code */ 

export const TicketList = () => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFiltered] = useState([])

    // "emergency" is the variable tracking the initial state of whether emergency tickets shoudl be shown ONLY when the "emergency only" button is clicked
    // "setEmergency" is the variable that changes the state, so only emergency tickets are shown when the "emergency only" button is clicked
    // by default, we don't want only the emergency tickets to show, so the default or initial state of emergency is "false"
    const [emergency, setEmergency] = useState(false)

    const localHoneyUser = localStorage.getItem("honey_user") 
    const honeyUserObject = JSON.parse(localHoneyUser)

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

return <>

{
    honeyUserObject.staff 
    ? <>
    <button onClick ={ () => { setEmergency(true) } } >Emergency Only</button>
    <button onClick ={ () => { setEmergency(false) } } >Show All</button>
    </> 
    : " "
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
