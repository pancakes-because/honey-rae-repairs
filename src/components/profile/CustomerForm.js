// *** coming from EmployeeViews.js *** 
// making a component called "CustomerForm" 
// just return an empty fragment for now 
// *** going to copy/paste this into EmployeeForm.js for now *** 
// *** now go back to Profile.js and replace the empty fragments with "EmployeeForm" and "CustomerForm" ***

// *** finished the Profile.js and EmployeeForm.js *** 
// we're doing the exact same thing here 

/* original code before we filled it in */ 
// export const CustomerForm = () => {
//     return <></>
// }


/* updated code after finishing EmployeeForm.js */ 
import { useEffect, useState } from "react"

export const CustomerForm = () => {
    // TODO: Provide initial state for profile

    const [ profile, updateProfile ] = useState({
        address: "",
        phoneNumber: 0,
        userId: 0 
    })

    const localHoneyUser = localStorage.getItem("honey_user") 
    const honeyUserObject = JSON.parse(localHoneyUser)

    // state variable for the feedback message 
    const [feedback, setFeedback] = useState("")

    // observer code for the feedback message 
    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    // TODO: Get customer profile info from API and update state

    useEffect(() => {
        fetch(`http://localhost:8088/customers?userId=${honeyUserObject.id}`)
            .then(response => response.json())
            .then((data) => {
                const customerObject = data[0]
                updateProfile(customerObject)
            })

    }, [])


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.

        */


    // tested that the feedback message works 
    // i changed the address to "2802 Zula Unlocks"
    // i got the feedback message as expected! 
    // the object in the database also changed to reflect this! 

    /* original data for the "customers" object with a primary key of "1" */ 
    // {
    //   "id": 1,
    //   "address": "2802 Zula Locks",
    //   "phoneNumber": "852-837-9713",
    //   "userId": 2
    // }

    /* updated data for the "customers" object with a primary key of "1" */ 
    // {
    //    "id": 1,
    //    "address": "2802 Zula Unlocks",
    //    "phoneNumber": "852-837-9713",
    //    "userId": 2
    // }
    

    return fetch(`http://localhost:8088/customers/${profile.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(profile)
    })
        .then(response => response.json())
        .then(() => {
            setFeedback("Customer profile successfully saved")
        })
}

    /* under fieldset, before the specialty input field, added code to make the employee receive a feedback message after they click "Save Profile*/ 

    return (


        <form className="profile">
            <h2 className="profile__title">New Service Ticket</h2>
            <fieldset>
                
                <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                    {feedback}
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.address}
                        onChange={
                            (evt) => {
                                // TODO: Update address property
                                const copy = {...profile}
                                copy.address = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="text"
                        className="form-control"
                        value={profile.phoneNumber}
                        onChange={
                            (evt) => {
                                // TODO: Update phone number property
                                const copy = {...profile}
                                copy.phoneNumber = evt.target.value
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