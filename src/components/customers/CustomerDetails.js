// we're doing the same thing here as we did in EmployeeDetails.js 

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const CustomerDetails = () => {
    
    const { customerId } = useParams()
    const [ customer, updateCustomer ] = useState({})


    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
                .then(response => response.json())
                .then((data) => {
                    const singleCustomer = data[0]
                    updateCustomer(singleCustomer)
                }) 
            
        },
        [customerId]
    )

    return <section className="customer">
    <header className="customer__header">{customer?.user?.fullName}</header>
    <div>Email: {customer?.user?.email}</div>
    <div>Phone Number: {customer.phoneNumber}</div>
    <footer className="customer__footer">Currently lives at {customer?.address} </footer>
</section>
}

// need an expand in fetch query to get phone and address to display 