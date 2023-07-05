import React, { useEffect, useState }  from 'react'
import { Link } from 'react-router-dom'
import {Container,Row,Col,Card,CardBody,CardTitle,CardText,InputGroup,InputGroupText,Input} from 'reactstrap'
import { enviarPeticion,obtenerUrl } from '../../functiones'
const Pagina = () => {
const [peliculas,setPeliculas] = useState([]);
const [filtro,setFiltro] = useState('');
const [por,setPor] = useState('nombre');
const [temporal,setTemporal] = useState([]);  
  useEffect(()=>{
    obtenerPeliculas();
  },[]);
  const obtenerPeliculas = async() =>{
    const res = await enviarPeticion('GET','','/peliculas','');
    setPeliculas(res.data);
    setTemporal(res.data); 
  }
  const buscar = (e) =>{
    if(filtro != ''){
      if(por == 'titulo'){
        setTemporal(peliculas.filter(p => p.titulo == filtro));
      }
      else if(por == 'genero'){
        setTemporal(peliculas.filter(p => p.genero == filtro));
      }
      else{
        setTemporal(peliculas.filter(p => p.franquicia == filtro));
      }
    }
    else{
      setTemporal(peliculas);
    }
  }
  return (
    <Container>
      <Row>
      <Col>
          <InputGroup className='mt-5 mb-3'>
            <InputGroupText><i className='fa-solid fa-search'></i></InputGroupText>
            <Input type="text" placeholder="Buscar" value={filtro} onChange={(e) =>{setFiltro(e.target.value)}} onKeyUpCapture={buscar}/>
            <Input type='select' onChange={(e) => setPor(e.target.value)}>
              <option value="titulo">Título</option>
              <option value="genero">Género</option>
              <option value="franquicia">Franquicia</option>
            </Input>
          </InputGroup>
          
        </Col>
      </Row>
      <Row>
      { temporal.map( (row,i)=>(
        <Col sm='6' md='6' lg='4' xxl='3' className='mb-3' key={row.id}>
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