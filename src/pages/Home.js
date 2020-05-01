import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

export default function Home() {

    const homeContainer = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh'
    }

    const homeStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '75px',
        border: '5px solid blue',
        height: '15vh',
        width: '30%',
        backgroundColor: '#eeeeee'
    }

    const loginStyle = {
        margin: '0',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }

    return (
        <div style={homeContainer}>
            <div style={homeStyle}>
                <Link to="/login">
                    <Button variant='primary'>
                        Login
                    </Button>
                </Link>
            </div>
        </div>
    )
}