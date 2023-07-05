import React,{useState} from 'react'
import {Container,Row,Col,Card,CardHeader,CardBody,CardText,Button,Form,InputGroup,InputGroupText,Input} from 'reactstrap'
import { useNavigate } from 'react-router-dom';
import { enviarPeticion } from '../../functiones';
import Storage from '../../Components/Storage';
const Login = () => {
  const [correo,setCorreo] = useState('');
  const [password,setPassword] = useState('');
  const ir = useNavigate();
  const validar = async(e) =>{
    e.preventDefault();
    const form = {correo:correo,password:password};
    const res = await enviarPeticion('POST',form,'/login','');
    if(res.status == true){
      Storage.set('authToken',res.data[1].token);
      Storage.set('authUser',res.data[0]);
      ir('/movies');
    }
  }
  return (
    <Container className='mb-5'>
      <Row className='mb-5'>
        <Col lg={{ offset: 2,size: 8}} md={{ offset: 1,size: 10}} className='mb-5'>
        <Card className='bg-light shadow mt-5 mb-5'>
          <CardHeader className='btn-green text-center h3'>Login </CardHeader>
          <CardBody className=''>
              <Form onSubmit={validar}>
                <InputGroup className='mt-3 mb-3'>
                  <InputGroupText><i className='fa-solid fa-at'></i></InputGroupText>
                  <Input type='email' value={correo} onChange={(e) => setCorreo(e.target.value)}  placeholder="Correo" required />
                </InputGroup>
                <InputGroup className='mt-3 mb-3'>
                  <InputGroupText><i className='fa-solid fa-key'></i></InputGroupText>
                  <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)}  placeholder="Contraseña" required />
                </InputGroup>
                <CardText className='text-center'>
                  <Button color='dark' className='mb-3'>Iniciar</Button>
              </CardText>
              </Form>
          </CardBody>
        </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login