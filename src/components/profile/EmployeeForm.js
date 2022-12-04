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

// now, lets' go to the API and get the employee's profile 
// so we'll put in a useEffect() here 
// to get the employee profile, we need to get one of the employee objects based on the userId
// bc what we have stored in local storage is the core userId in the "users" data table -- not the "userId" that is the primary key of their profile/"employee" information
// so we need to filter down the list of employees to only the one whose userId matches what we have in local storage
// to do this, we need a query string parameter 
// for example, say we want the employee whose userId is 4, our URL would be http://localhost:8088/employees?userId=4 
// so by doing this, we have filtered down the entire list of employee profiles to only a single profile
// bc this is a filtering operation, we still get an array
// so we'll put the URL we made in th fetch request
// but we don't want to hard code a specific number 
// *** we need to get the userId from local stroage, which we can copy from another component that has it like Profile.js ***
// *** go to Profile.js and copy the local storage code from *** 
// *** then paste the local storage code here in EmployeeForm.js *** 
// referring back to the fetch call, the id property of the local storage user gets interpolated there
// so the fetch URL looks like this: http://localhost:8088/employees?userId=${honeyUserObject.id}
// reminder, we're getting an array from the fetch call 
// through the filtering, all the userIds will be unique 
// so we just need to grab the first item out of the array, get the object inside of it, then update the component state variable with that obejct
// so we fill in "data" for the second .then of the fetch call bc that is what we're getting in response
// so we're snagging the first item and storing it in a variable called "employeeObject"
// reminder, "data[0]" is bracket notation explaining that we're going into the "data" object and pulling out the item that has an index of 0, or the 1st item in the object 
// now, we go to the browser, and can look at "state" for the employee form 
// the state variable is filled with that specific employee information (primary key, specialty, rate, and foriegn key to base user object)
// *** and because we bound the speciatly and rate properties to their matching input fields, as soon as we updated state, and the default values changed - as soon as those values changed - react knows that a state variable changed and it will re-render the input fields and put the specified values in them automatically for us ***

// now, we have to implement the onChange events for specialty and rate to capture the user input
// this will make it so that everytime the user is typing in the input field, meaning they are changing it, we're going to update the state variable apporpriately
// so just like we have done before, we're going to to copy state, modify the copy, and then update state with the copy
// even though the rate is a "number" type input field, the value of it will always be a string when we extract it from the dom
// we can see this in dev tools
// *** we want the value to be a float, so we can wrap evt.target.values in parseFloat ***
// *** we can also specify how many decimal places the number should have *** 
// we should see this reflected in the dev tools when viewing state 
// also, if we add more to the specialty field input, this should be shown in dev tools also 
// for example, the default value is "PC Repairs" and then change this to "PC Repairs and Mac repairs", the state will change and the state will show what we added/typed in in dev tools
// so the state is updated because we implemented the change event listener 

// *** to recap so far ***
// *** we got initial state, then fetched the permanent from API, and updated component state that fills out the input fields, and now we're capturing what the user is typing in ***
// *** so the final step in the process is to go back and update permanent state when they click on the "Save Profile" button *** 
// the handleSaveClickEvent button is the function that runs when the button is clicked 
// so now it's time for another fetch call, but the method on this is going to be a PUT - which means "replace"
// so here, we're replacing a single object and need to target it directly
// so we have to target the employee object in order for the PUT operation to replace it with what we're going to send in the request
// reminder, the primary key on the employee object is its unique identifer 
// in the URL we're building, the id (e.g. "1") needs to be there 
// we already have this in our state
// so the URL looks like this: http://localhost:8088/employees/${profile.id}
// then we need do our fetch options
// so we need to specify that the method is "PUT"
// then in the "body", the body of the request, we need to stringify and put in the state variable 
// reminder, the state variable is whatever they have currently typed in
// so we're stringifying the whole thing, sending it to JSON server, and asking it to replace the current data with this new data
// to see the magic happen, we can go back to our dev tools
// for example, we type in "PC Repairs and Mac repairs" for specialty and "80" for rate 
// context, this represents the 1st employee (id: 1) who has expanded their specialyt and upped their rate)
// then we click the "Save Profile" button, and look at the "Network" tab in dev tools 
// if we look at the request, it works (200 OK message)
// then we go back to our database, and see that this object in employees has updated 
// so we have successfully modified the employee profile! 

import { useEffect, useState } from "react"

export const EmployeeForm = () => {
    // TODO: Provide initial state for profile

    const [ profile, updateProfile ] = useState({
        specialty: "",
        rate: 0,
        userId: 0 
    })

    const localHoneyUser = localStorage.getItem("honey_user") 
    const honeyUserObject = JSON.parse(localHoneyUser)

    // TODO: Get employee profile info from API and update state

    useEffect(() => {
        fetch(`http://localhost:8088/employees?userId=${honeyUserObject.id}`)
            .then(response => response.json())
            .then((data) => {
                const employeeObject = data[0]
                updateProfile(employeeObject)
            })

    }, [])


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.

        */

        return fetch(`http://localhost:8088/employees/${profile.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(profile)
        })
            .then(response => response.json())
            .then(() => {
                // Do nothing 
            })
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
                                const copy = {...profile}
                                copy.specialty = evt.target.value
                                updateProfile(copy)
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
                                const copy = {...profile}
                                copy.rate = parseFloat(evt.target.value, 2) 
                                updateProfile(copy)
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