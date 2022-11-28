// coming from TicketList.js 
// now, we're going to share state between two components with props (which are like arguments to functions)
// when there are two sibling components, they cannot share state. 
// you have to make a parent component that contains both of them, and then both child components share state between them. 
// we're going to do this with adding a search input field for tickets for employees ONLY. 
// this will let the employee type in the description of ticket and receive a list of tickets matching what they typed in.
// so we need to create a parent component containing both the input field and the list of tickets.
// ***so create a new component or module called "TicketSearch.js"***

// this function is just making an input field right now
// put the input field inside a div, so it's a little separate from the other buttons coming from "TicketList.js"

// coming from TicketContainer.js where we made a prop for TicketSearch 
// *** react rule: react takes all the props and brings them all into a single object. 
// so for the TicketSearch prop, the object will have a key of "setterFunction", and the value will be the "setSearchTerms" function
// *** no we're in TicketSearch.js now to extract the property through object deconstruction ***
// so we put the key from our TicketSearch prop in as the "parameter" for the "TicketSearch" function
// reminder, as written in TicketContainer.js, the key in this situation is "setterFunction" (seen in TicketContainer.js)
// *** so now the TicketSearch component has access to the "setSearchTerms" setter function via this property of setterFunction; see TicketContainer.js for context ***
// *** so the value of this variable (which is "setterFunction") in TicketSearch.js, in the TicketSearch function, for the state variable in the parent ***
// now, we can invoke the function in the onChange listener event

export const TicketSearch = ({ setterFunction }) => {
    return (
        <div>
            <input 
                onChange={
                    (changeEvent) => {
                        setterFunction(changeEvent.target.value) 
                    }
                }
            type="text" placeholder="Enter search terms" /> 
        </div>
    )
}