import React, { use, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const useAuth = () => {
    const { isAuth, setIsAuth, loginData, setLoginData } = useContext(AuthContext)
    let navigate = useNavigate()

    const login = async (e) => {
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        // console.log(data)

        if (!validateForm(data)) {
            alert('Por favor, completa todos los campos')
            return
        }
        let response = await fetch('http://localhost:3000/apiolympo/clientes/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        let result = await response.json()
        console.log(result)

        if (response.ok) {
            
            setIsAuth(true)
            navigate('/dashboard')

        } else {
            alert(result.error || 'Error desconocido')
        }
    }

    const logout = () => {
        sessionStorage.removeItem('token')
        setLoginData(null)
        setIsAuth(false)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setLoginData(prevData => ({ ...prevData, [name]: value }))
    }

    const validateForm = (data) => {
        return data.email.trim() !== '' && data.contrasenna.trim() !== ''
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(e)
    }

    return { isAuth, login, logout, handleInputChange, handleSubmit, loginData }
}

export default useAuth