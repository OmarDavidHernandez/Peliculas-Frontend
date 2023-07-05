import React,{useEffect,useState} from 'react'
import {Container,Row,Col,Card,CardBody,CardTitle,CardText,Button,Form,InputGroup,InputGroupText,Input} from 'reactstrap'
import { enviarPeticion } from '../functiones'

const FormUsuario = (parametros) => {
  const [nombre,setNombre] = useState('');
  const [correo,setCorreo] = useState('');
  const [password,setPassword] = useState('');
  let metodo = 'POST';
  let url = '/usuarios';
  useEffect( () =>{
    obtenerUsuario();
  },[]);
    const obtenerUsuario = async() =>{
        if(parametros.id !== null){
            const res = await enviarPeticion('GET','',(url+'/'+parametros.id),'',true);
            setNombre(res.data[0].nombre);
            setCorreo(res.data[0].correo);
        }
    }
    const guardar = async(e) =>{
        e.preventDefault();
        if(parametros.id !== null){
            metodo= 'PUT';
            url = '/usuarios/'+parametros.id;
        }
        await enviarPeticion(metodo,{nombre:nombre,correo:correo,password:password},url,'/usuarios',true);
        
    }
  return (
    <Container>
      <Row>
        <Col>
        <Card className='bg-white mt-5 shadow text-center'>
              <CardBody>
                  <CardTitle className=''>
                  <p className='h3 text-center'>{ parametros.titulo}</p>
                  </CardTitle>
                  <CardText>
                    <Row>
                        <Col md='12'>
                        <Form onSubmit={guardar}>
                            <InputGroup className='mt-5 mb-3'>
                                <InputGroupText><i className='fa-solid fa-user'></i></InputGroupText>
                                <Input value={nombre} placeholder="Nombre"  onChange={(e) => setNombre(e.target.value)} required />
                            </InputGroup>
                            <InputGroup className='mt-3 mb-3'>
                                <InputGroupText><i className='fa-solid fa-at'></i></InputGroupText>
                                <Input value={correo} placeholder="Correo"  onChange={(e) => setCorreo(e.target.value)} required />
                            </InputGroup>
                            <InputGroup className='mt-3 mb-3'>
                                <InputGroupText><i className='fa-solid fa-key'></i></InputGroupText>
                                <Input value={password} placeholder="Contraseña"  onChange={(e) => setPassword(e.target.value)} required />
                            </InputGroup>
                            <p className='text-center mt-3'><Button color='dark'><i className='fa-solid fa-save'></i> Guardar</Button></p>
                        </Form>
                        </Col>
                    </Row>
                  </CardText>
                  
              </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default FormUsuario