import React, { useEffect, useState} from 'react'
import OrderItem from './OrderItem'
import { getOrders, getServices } from './API'

const OrderComponent = () => {
    const [ orders, setOrders ] = useState([])
    const [ cabins, setCabins ] = useState([])
    const [ services, setServices ] = useState([])
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        const fetchOrders = async () => {
            const res = await getOrders()
            console.log(res)
            setOrders(res)
            setLoading(false)
        }
        fetchOrders().catch((err) => {
            console.error(err);
        });
        const fetchServices = async () => {
            setLoading(true)
            const res = await getServices()
            console.log(res)
            setServices(res)
            setLoading(false)
        }
        fetchServices().catch((err) => {
            console.error(err);
        });
    },[])

    return (
        console.log(orders),
        <div className='container mainComponent'>
            { orders !== null && services !== null && !loading ? 
                orders.map(order => (
                    <OrderItem order={order} services={services} key={order.id} />
                ))
                : <span>Loading...</span>
            }
        </div>
    )
}

export default OrderComponent