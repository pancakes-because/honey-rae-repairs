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

        // so up to this point, we've set up the object to be saved to the API after the customer clicks "submit ticket" and the JSON server has responded. see below.
        // next thing to do is redirect the customer back to the ticket list. 
        // reminder, we have a useNavigate that we haven't used yet. this will help us redirect customers. 
        // we have saved useNavigate() to a variable called "navigate". 
        // we can use in our "POST" fetch call. see below for more details. 
        
        const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        // to test if the "submit ticket" button works, can use a console.log and check if the message appears in dev tools
        // console.log("You clicked the button")

        // TODO: Create the object to be saved to the API

        // exampled pulled from serviceTickets API/database 
        // this is the kind of object we need to create right now
        /* 

            {
                "userId": 3,
                "description": "Vero est adipisci sed natus quasi consectetur occaecati. Modi maxime sunt officia cumque. Vel at culpa. Sint accusamus deserunt dolorem qui.",
                "emergency": true,
                "dateCompleted": ""
            }
        
        */ 
        // we can make a new variable, "ticketToSendToApi", to store the object. 
        // reminder, we don't need add the "id" right now. that will be assigned by JSON later when the object is added to the serviceTickets array. 
        // reminder, the JSON gives us the "userId". that's stored in honeyUserObject, so we'll use this.
        // for the description property, that comes from the "ticket" state variable  
        // same thing goes for the emergency property 
        // for dateCompleted, the idea is that the customer is creating the ticket in the moment. so we can just leave it as an empty string.

        const ticketToSendToAPI = {
            userId: honeyUserObject.id, 
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: ""

        }

        // TODO: Perform the fetch() to POST the object to the API

        // we're sending the ticket information to serviceTickets in the API
        // so this is the URL we have to use: http://localhost:8088/serviceTickets
        // the method is "POST" since we're sending data to the API
        // we also need to specify some headers, specifically just one saying what the content type is
        // this is because the server needs to know what type of content is being passed to it 
        // "applicatino/json" is how you do it for an http header
        // then you need the body of the request or the information that the client wants to save
        // also, we can't just send a raw object. we need to make it a string with JSON.stringify. 
        // the "ticketToSendToAPI" variable holds what the customer submitted, so we pass this on through. 

        // so up to this point, so up to this point, we've set up the object to be saved to the API after the customer clicks "submit ticket" and the JSON server has responded. 
        // now, we need to redirect customers back to the ticket list. we can do this with useNavigate. see above. 
        // we stored useNavigate in a variable called "navigate", and we're going to come back down here to use that. 
        // the route path for the ticket list is "/tickets", so we use this

        return fetch(`http://localhost:8088/serviceTickets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"

            },
            body: JSON.stringify(ticketToSendToAPI)

        })
            .then(response => response.json())
            .then(() => {
                navigate("/tickets") 
            })
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
    // now, we do mostly the same thing for the emergency onChange event. original code: onChange={} />. updated code below. 
    // for checkbox fields, we use "checked" for the event target, so it's "evt.target.checked"
    // now we update the state for BOTH 
    // reminder, the function for update is called "updated". so we just pass the "copy" through that to be the new state.
    // see dev tools and notice how the state changes 

    // so the information that the user types into the input fields in the form are always captured in a state variable in the component
    // now, we want the "Submit Ticket" button to work.
    // so we must do a fetch to get the information the customer added in, and add it to the serviceTickets array in our API/database
    // so we want to create a new object that stores the information in the serviceTickets array
    // it will identical to the other objects, except the primary key. JSON server makes the primary key for us. 

    // when the "Submit Button" is clicked, it does not work right now. 
    // we need an onClick event 
    // reminder, in the boilerplate code, there is a function called "handleSaveButtonClick". 
    // this is the function that we want the instructions to run for when the button is clicked. 
    // so make an onClick event with "handleSaveButtonClick"
    // if we look back at the "handleSaveButtonClick" function, "event" is a parameter
    // so to invoke the "handleSaveButtonClick" function for the onClick, we need to pass the click event to the function
    // we're naming this "clickEvent"
    // no we should be done with this bit. 

    // now we go back to the "handleSaveButtonClick" function above 
    // complete the 3rd TODO task (creating an object); see above for details
    // complete the 4th TODO task (make a "POST" fetch call); see above for details 
    // complete the 2nd TODO task (use the useNavigate() hook); see above for details 

    /* ***so as a recap, the instructions in the handleSaveButtonClick function will run. we then created a javascript object that has all the required properties on it. then we stringified the object. then we sent a POST request to JSON saying, "please save the information, respond back to me when you're done, i'm going to redirect the customer back to the ticket list after". *** */ 
    // go to the react app in the browser, submit a request with dev tools network tab open to see the magic happen!
    // we should be back on the ticket list with the new ticket at the bottom (my computer won't boot, emergency)
    // reminder, this is only if you're logged in as a customer 

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
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Ticket
            </button>
        </form>
    )
}