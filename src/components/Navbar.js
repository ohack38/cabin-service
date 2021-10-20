import React from 'react'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'

const Navbar = () => {
    return (
        <div style={{height: '40px'}}>
            <Link to="/">
                <Button>Order Services</Button>
            </Link>
            <Link to="/orders">
                <Button>Orders</Button>
            </Link>
            
            
        </div>
    )
}

export default Navbar;