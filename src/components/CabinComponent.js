import React, {useState} from 'react'
import { DropdownButton, Dropdown, Button } from 'react-bootstrap'
import DatePicker, {registerLocale, setDefaultLocale} from "react-datepicker";

import { addOrder } from './API'


const CabinComponent = ({ cabin, services }) => {
    const [date, setDate] = useState(new Date());
    const [service, setService] = useState("")
    
    const handleSelect = (e) => {
        setService(e)
      }
    const handleOrder = () => {
       try {
            addOrder(service,date, cabin._id)
       } catch (err) {
            console.log(err)
       }
    }
    console.log(date, service)
    return (
        <div className='row cabinComponent '>
            <div className='col-3'><span>{cabin.adress}</span></div>
            <DropdownButton className='col-3' id="dropdown-item-button" title={ service ? service : "Service"}>
                {services.map( service => (
                    <Dropdown.Item eventKey={service.service} key={service.id} onSelect={handleSelect}>{service.service}</Dropdown.Item>
                ))}
            </DropdownButton>
            <div className='col-3'><DatePicker selected={date} dateFormat='dd-MM-yyyy' onChange={(date) => setDate(date)} /></div>
            <div className='col-3'><Button disabled={!service} onClick={handleOrder}>Order Service</Button></div>
            
        </div>
    )
}

export default CabinComponent