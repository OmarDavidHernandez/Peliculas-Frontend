import { useState } from 'react'
import { useNavigate} from 'react-router-dom';
import { Navbar,Nav,NavLink,NavbarBrand,NavbarToggler,NavbarText,Collapse,NavItem, Button } from 'reactstrap'
import Storage from './Storage';
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const ir = useNavigate();
  const salir = () =>{
    Storage.remove('authToken');
    Storage.remove('authUser');
    ir('/login');
  }
  return (
    <header className='mb-5'>
        <Navbar expand="lg" fixed="top" color='primary' dark={true}>
        <NavbarBrand href="/">Pelitrópolis</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
          </Nav>
          
          { Storage.get('authUser') ? (
            <>
            <NavLink href="/usuarios" className='text-white h3 me-md-5'>
              Usuarios
            </NavLink>
            <NavLink href="/movies" className='text-white h3 me-md-5'>
              Películas
            </NavLink>
            <NavLink className='text-white h3 me-md-5'>
              {Storage.get('authUser').nombre}
            </NavLink>
            <NavbarText>
              <Button color='blue text-white' onClick={salir}>Salir</Button>
            </NavbarText>
            </>
            ) : ''}
          
        </Collapse>
        </Navbar>
    </header>
  )
}

export default NavBar