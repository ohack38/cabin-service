import React, {useState} from 'react'
import { DropdownButton, Dropdown, Button } from 'react-bootstrap'
import DatePicker, {registerLocale, setDefaultLocale} from "react-datepicker";

import { updateOrder, deleteOrder } from './API'


const OrderItem = ({ order, services }) => {
    const [date, setDate] = useState(new Date(order.date));
    const [service, setService] = useState(order.service)
    
    const handleSelect = (e) => {
        setService(e)
      }
    const handleUpdate = () => {
       try {
            updateOrder(service,date, order.id)
       } catch (err) {
            console.log(err)
       }
    }
    const handleDelete = () => {
        try {
             deleteOrder(order.id)
        } catch (err) {
             console.log(err)
        }
     }
    console.log(new Date(order.date))
    return (
        <div className='row cabinComponent '>
            <div className='col-3'><span>{order.cabin_id}</span></div>
            <DropdownButton className='col-2' id="dropdown-item-button" title={ service ? service : "Service"}>
                {services.map( service => (
                    <Dropdown.Item eventKey={service.service} key={service.id} onSelect={handleSelect}>{service.service}</Dropdown.Item>
                ))}
            </DropdownButton>
            <div className='col-3'><DatePicker selected={date} dateFormat='dd-MM-yyyy' onChange={(date) => setDate(date)} /></div>
            <div className='col-2'><Button onClick={handleUpdate}>Update Service</Button></div>
            <div className='col-2'><Button onClick={handleDelete}>Delete Service</Button></div>
            
        </div>
    )
}

export default OrderItem