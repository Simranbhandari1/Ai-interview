import { useContext } from 'react';
import { AuthContext } from '../auth.context';
import { login, register, logout } from '../services/auth.api';
export const useAuth = () => {
    const context = useContext (AuthContext)
    const { user, setUser, loading, setLoading } = context
    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login({ email, password })
            setUser(data)
        } catch (error) {
            console.error('Login failed:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ email, password, name }) => {
        setLoading(true)
        try {
            const data = await register({ email, password, name })
            setUser(data)
        } catch (error) {
            console.error('Registration failed:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            await logout()
            setUser(null)
        } catch (error) {
            console.error('Logout failed:', error)
        } finally {
            setLoading(false)
        }
    }
return{user, loading, handleLogin, handleRegister, handleLogout}
    // const fetchCurrentUser = async () => {
    //     setLoading(true)
    //     try {
    //         const userData = await getMe()
    //         setUser(userData)
    //     } catch (error) {
    //         console.error('Failed to fetch current user:', error)
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    // return { user, loading, handleLogin, handleRegister, handleLogout, fetchCurrentUser }

}