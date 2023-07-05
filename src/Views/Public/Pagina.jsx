import React, { useRef, useEffect, useState }  from 'react'
import { Link } from 'react-router-dom';
import {Container,Row,Col,Card,CardBody,CardTitle,CardText,Button,Modal} from 'reactstrap'
import { enviarPeticion,obtenerUrl } from '../../functiones'
const Pagina = () => {
  const imagenes = useRef(null);
  useEffect(()=>{
    obtenerPeliculas();
  },[]);
  const [peliculas,setPeliculas] = useState([]);
  const obtenerPeliculas = async() =>{
    const res = await enviarPeticion('GET','','/peliculas','');
    setPeliculas(res.data);
  }
  return (
    <Container>
      <Row>
      { peliculas.map( (row,i)=>(
        <Col sm='6' md='6' lg='4' xxl='3' className='mt-3 mb-3' key={row.id}>
        <Card className='bg-light shadow'>
        <img className='rounded' src={obtenerUrl()+row.imagen} height='250px'></img>
            <CardBody className='card-blog'>
                <CardTitle className='h4 text-center mb-3'>{row.titulo}</CardTitle>
                <CardText className='text-justificado mt-2'>
                { row.sinopsis.substring(0, 100) } ...
                </CardText>
                <CardText className='text-center'>
                    <Link to={'/pelicula/'+row.id} className='btn btn-primary mb-3'>Detalles</Link>
                </CardText>
            </CardBody>
        </Card>
        </Col>
        ))}
      </Row>
      <Row className='bg-brown'>
        <Col lg={{ offset: 2,size: 8}} md={{ offset: 1,size: 10}}>
        
        </Col>
      </Row>
    </Container>
  )
}

export default Pagina