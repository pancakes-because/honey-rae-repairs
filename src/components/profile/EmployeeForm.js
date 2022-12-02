// *** mostly copy/pasted this from CustomerForm.js to start *** 
// just holds an empty fragment for now 
// *** now go back to Profile.js and replace the empty fragments with "EmployeeForm" and "CustomerForm" ***

/* original code in video before boilerplate code came in */ 
// export const EmployeeForm = () => {
//     return <></>
// }

// now, we can use the boilerplate code given to us 
/* updated code after boilerplate comes into play */ 

// note the TODO items below 
// 1st, we need to fill in the handler for the click button
// 2nd, need to implement the onChange for each of the input fields, so we can update the state as the user types
// 3rd, we'll provide some initial state
// 4th, we're going to get the employee profile information from the API 
// 5th, and finally, we'll have to do the PUT operation to update what the user typed in

// now, we'll take handleSaveButtonClick function invoke it in the onClick 
// and we'll pass the the clickEvent along to that one, which doesn't do anything the moment except prevent the default behavior (event.preventDefault())
// then we add "event" as the argument for the "handleSaveButtonClick" function 
// now we get errors because we have other things to fill out 

// we need a state variable now 
// also, notice the input fields where employees can put in their speciality and hourly rate 
// we'll name our state variable "profile"
// the inital state for this, since we're in a form, we'll provde some properties here with some default values 
// *** refer back to "employees" object array in database.json in honey-raes-api ***
// so this initial state object needs specialty, rate, and userId on it with some initial values
// so put these properties inside the useState() 

// now, lets' go to the API and get their profile 
// so we'll put in a useEffect() here 

import { useEffect, useState } from "react"

export const EmployeeForm = () => {
    // TODO: Provide initial state for profile

    const [ profile, updateProfile ] = useState({
        specialty: "",
        rate: 0,
        userId: 0 
    })


    // TODO: Get employee profile info from API and update state


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
    }

    return (
        <form className="profile">
            <h2 className="profile__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Specialty:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.specialty}
                        onChange={
                            (evt) => {
                                // TODO: Update specialty property
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Hourly rate:</label>
                    <input type="number"
                        className="form-control"
                        value={profile.rate}
                        onChange={
                            (evt) => {
                                // TODO: Update rate property
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
    )
}