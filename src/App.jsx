
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import AuthLayout from './layouts/AuthLayout'
import Auth from './pages/Auth'
import RutaProtegida from './layouts/RutaProtegida'
import Avicola from './pages/Avicola'
import Register from './pages/Register'
import Pagos from './pages/Pagos'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<AuthLayout />}>
            <Route index element={<Auth />}/>
            <Route path='registrar' element={<Register/>}/>
            <Route path='pagos' element={<Pagos />}/>
          </Route>

          <Route path='/panel' element={<RutaProtegida />}>
            <Route index element={<Avicola />}/>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
