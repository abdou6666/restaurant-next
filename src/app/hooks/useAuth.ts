import axios from 'axios';
import { AuthenticationContext } from '../context/AuthContext';
import { useContext } from 'react';

interface SignInProps {
    email: string,
    password: string,
    handleClose: () => void
}
interface SignUpProps extends SignInProps {
    first_name: string,
    last_name: string,
    city: string,
    phone: string,
}
const useAuth = () => {
    const { data, error, loading, setAuthState } = useContext(AuthenticationContext);

    const SignIn = async ({ email, password, handleClose }: SignInProps) => {
        setAuthState({
            data: null,
            error: null,
            loading: true
        })
        try {
            const res = await axios.post('http://localhost:3000/api/auth/sign-in', {
                email,
                password
            })
            setAuthState({
                data: res.data,
                error: null,
                loading: false
            })
            handleClose()
        } catch (error: any) {

            setAuthState({
                data: null,
                error: error.response.data.errorMessage,
                loading: false
            })
        }
    }
    const SignUp = async ({ email, password, city, first_name, last_name, phone, handleClose }: SignUpProps) => {
        setAuthState({
            data: null,
            error: null,
            loading: true
        })
        try {
            const res = await axios.post('http://localhost:3000/api/auth/sign-up', {
                email,
                password,
                city,
                firstName: first_name,
                lastName: last_name,
                phone
            })
            setAuthState({
                data: res.data,
                error: null,
                loading: false
            })
            handleClose()
        } catch (error: any) {
            console.log(error)
            setAuthState({
                data: null,
                error: error.response.data.errorMessage,
                loading: false
            })
        }
    }



    return {
        SignIn,
        SignUp,
    }
}

export default useAuth