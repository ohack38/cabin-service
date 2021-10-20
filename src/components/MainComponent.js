import React, { useEffect, useState} from 'react'
import CabinComponent from './CabinComponent'
import { getCabins, getServices } from './API'

const MainComponent = () => {
    const [ cabins, setCabins ] = useState([])
    const [ services, setServices ] = useState([])
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        const fetchCabins = async () => {
            const res = await getCabins()
            console.log(res)
            setCabins(res)
            setLoading(false)
        }
        fetchCabins().catch((err) => {
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
        console.log(cabins),
        <div className='container mainComponent'>
            { cabins !== null && services !== null && !loading ? 
                cabins.map(cabin => (
                    <CabinComponent cabin={cabin} services={services} key={cabin._id} />
                ))
                : <span>Loading...</span>
            }
        </div>
    )
}

export default MainComponent