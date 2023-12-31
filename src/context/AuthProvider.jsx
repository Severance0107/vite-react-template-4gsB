import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({})
    const [pagoState, setPagoState] = useState(1)
    const [pagoInformacion, setPagoStateInformacion] = useState(1)
    const [cargando, setCargando] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        autenticarUsuario()
    },[])
    
    const autenticarUsuario = async () => {
        const token = localStorage.getItem('token')
        if(!token){
            setCargando(false)
            return
        }

        setAuth({token})
        navigate('/panel')
        setCargando(false)
    }
    
    const siguientePaso = (estado) => {
        setPagoState(estado)
    }
    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                pagoState,
                setPagoState,
                siguientePaso,
                setPagoStateInformacion,
                pagoInformacion
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;