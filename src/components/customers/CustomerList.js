// we're doing the same thing here as we did for Employee List.js 
// remember to go to NavBar.js and make a "customers" link there; should only be seen by employees
// then go  go EmployeeViews and make a route that supports this 

import { useEffect, useState } from "react"
import { Customer } from "./Customer"
import "./Customers.css"

export const CustomerList = () => {

    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/users?isStaff=false`)
                .then(response => response.json())
                .then((customerArray) => {
                    setCustomers(customerArray)
                }) 
        },
        []
    )

    return <article className="customers">
    {
        customers.map(customer => <Customer key={`customer--${customer.id}`}
            id={customer.id} 
            fullName={customer.fullName} 
            address={customer.address}
            phoneNumber={customer.phoneNumber} /> )
    }
</article>
} 