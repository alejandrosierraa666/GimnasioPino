import React, { use, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const useAuth = () => {
    const { isAuth, setIsAuth, loginData, setLoginData, setCliente, cliente, loading } = useContext(AuthContext)

    const login = async (e) => {
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())

        if (!validateForm(data)) {
            alert('Por favor, completa todos los campos')
            return
        }

        let response = await axios.post('/apiolympo/clientes/login', { email: data.email, contrasenna: data.contrasenna },  { withCredentials: true });

        let result = await response.data
        console.log(result)

        if (result.success) {
            setIsAuth(true)
            setCliente(result.user)
        } else {
            alert(result.error || 'Error desconocido')
        }
    }

    const logout = () => {
        setLoginData({
            email: '',
            contrasenna: '',
        })
        setIsAuth(false)
        setCliente(null)

        const response = axios.post('/apiolympo/clientes/logout')
        if (response.data.success) {
            alert('Sesión cerrada exitosamente')
        } else {
            alert('Error al cerrar sesión')
        }
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

    return { isAuth, login, logout, handleInputChange, handleSubmit, loginData, cliente, loading }
}

export default useAuth