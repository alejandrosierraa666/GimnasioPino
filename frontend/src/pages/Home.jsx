import React from 'react'
import useAuth from '../hooks/useAuth'

const Home = () => {
    const { logout } = useAuth()
    return (
        <>
            <div>Home</div>
            <button onClick={logout}>Cerrar Sesion</button>
        </>

    )
}

export default Home