// coming from ApplicationViews.js 
// *** making a new component called "TicketContainer.js ***
// this will make up the parent component that contains TicketSearch and TicketList, so they can share state
// the parent is what lets them communicate with each other; react rule: child components get state from a parent component

import { useState } from "react"
import { TicketList } from "./TicketList.js"
import { TicketSearch } from "./TicketSearch.js"

// *** it is what maintains the state *** 
// *** so TicketList and TicketSearch will get access to the state via props ***
// so now we need to set up the state variable for the search terms 
// *** reminder, two sibling components cannot talk directly to each other - must go through a parent *** 
// so now we have a component that returns two child components 

// as the employee types in the field, what they type is the search terms
// what they type is being entered into the TicketSearch, but the parent contains the state of searchTerms itself and the function to change the state of searchTerms
// the search component needs the setter function, which is "setSearchTerms"
// so we can put an onChange listener there, invoke the setter function as the user types
// so this means that the parent components needs to pass a reference to the function down to TicketSearch

// as for TicketList, it needs to know what are the current search terms so it can do the filtering and display only the tickets that match those search terms.
// bc of this, it doesn't need access to the setter function - it needs access to the state
// *** so this, TicketSearch and TicketList, is what props look like ***
// *** this is what it looks like when a parent passes down things to child components ***

// to get access to the function in TicketSearch, we access the key of setterFunction which is on an object
// *** react rule: it takes all the props and brings them all into a single object. 
// so for the TicketSearch prop, the object will have a key of "setterFunction", and the value will be the "setSearchTerms" function
// *** no we're going to TicketSearch.js and extracting the property through object deconstruction ***

// coming back from TicketSearch.js 
// TicketSearch inherited state from TicketContainer like we expected 
// we can see this happen with the dev tools in our browser 
// now, TicketList needs access to the string (which is what the user typed in in the search field)
// *** now, going over to TicketList.js *** 

export const TicketContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <TicketSearch setterFunction={setSearchTerms}/> 
        <TicketList searchTermState={searchTerms}/> 
    </>
}