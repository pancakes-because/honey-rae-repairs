/* most of this is boilerplate code given to us. */ 

import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const TicketForm = () => {
    /*
        TODO: Add the correct default properties to the
        initial state object
    */

    // "ticket" is a state variable
    // it has a function for updating the state called "update"
    // now we're adding a property for each form field with a default value
    // one of them is "description", and we initially want nothing to appear in the description, so the value is an empty string
    // for "emergency", we will default to "false" as the value, so the checkbox is not filled in and marked as an emergency

    /* original code */ 
    // const [ticket, update] = useState({

    // })

    /* upated code */ 
    const [ticket, update] = useState({
        description: "",
        emergency: false
    })

    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        // TODO: Create the object to be saved to the API


        // TODO: Perform the fetch() to POST the object to the API
    }

    // we have two input fields here 
    // the first is for the input field to enter in a description of the problem 
    // the second is a checkout field for clicking if their ticket is an emergency ticket 
    // we have default values inside the inputs for everything that the user will be typing in 
    // these are the value attributes, "description" in ticket.description and "emergency" in ticket.emergency 

    // we just updated the ticket state variable and update function with the description and emergency properties above
    // reminder, we have an onChange event. original code: onChange={} />. updated code below. 
    // this makes it so that every time the customer types something in or clicks the checkbox, the two properties update
    // to implement this, need to update our state. this is where the "update" function comes in to help. 
    // first, we copy the existing state of "ticket" using the spread operator. we don't want to directly access whatever ticket.description equals. 
    // now we can modify the copy. the new value of the description property should be whatever the current value of the input field.
    // we get the new value through the change event that is broadcast through the browser.
    // so for the callback function, we capture the change event. we used "evt" for this
    // then we set the description to the event target's value (evt.target.value)
    // in essence, this is currently whatever is in the input field. 
    // now we update the state 
    // reminder, the function for update is called "updated". so we just pass the "copy" through that to be the new state.

    // now, we do mostly the same thing for the emergency onChange event. original code: onChange={} />. updated code below. 
    // for checkbox fields, we use "checked" for the event target, so it's "evt.target.checked"
    // now we update the state 
    // reminder, the function for update is called "updated". so we just pass the "copy" through that to be the new state.

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={ticket.description}
                        onChange={
                            (evt) => {
                                const copy = {...ticket}
                                copy.description = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        value={ticket.emergency}
                        onChange={
                            (evt) => {
                                const copy = {...ticket}
                                copy.emergency = evt.target.checked
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button className="btn btn-primary">
                Submit Ticket
            </button>
        </form>
    )
}