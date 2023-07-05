import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './Components/Navbar'
import Pagina from './Views/Public/Pagina'
import Login from './Views/Public/Login'
import ProtectedRoutes from './Components/ProtectedRoutes.jsx'
import Detalle from './Views/Public/Detalle'
import IndexUsuarios from './Views/Admin/Usuarios/Index'
import CrearUsuario from './Views/Admin/Usuarios/Crear'
import EditarUsuario from './Views/Admin/Usuarios/Editar'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Pagina />} />
        <Route path="/pelicula/:id" element={<Detalle />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/usuarios" element={<IndexUsuarios />} />
          <Route path="/crear-usuario" element={<CrearUsuario />} />
          <Route path="/editar-usuario/:id" element={<EditarUsuario />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
