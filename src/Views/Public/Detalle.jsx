import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import {Container,Row,Col,Card,CardBody,CardTitle,CardText,Button,Form,InputGroup,InputGroupText,Input} from 'reactstrap'
import { enviarPeticion,obtenerUrl } from '../../functiones'

const Detalle = (parametros) => {
    const {id} = useParams();
    const [genero,setGenero] = useState('');
    const [titulo,setTitulo] = useState('');
    const [sinopsis,setSinopsis] = useState('');
    const [imagen,setImagen] = useState('');
    const [actores,setActores] = useState('');
    const [directores,setDirectores] = useState('');
    const [franquicia,setFranquicia] = useState('');
    const [review,setReview] = useState([]);
    const [fecha,setFecha] = useState('');
    const [comentario,setComentario] = useState('');
    useEffect( () =>{
        obtenerPelicula();
    },[]);
    const guardar = async(e) =>{
        e.preventDefault();
        let url = '/review/'+id;
        await enviarPeticion('PUT',{review:comentario},url,('/pelicula/'+id),false);        
    }

    const obtenerPelicula = async() =>{
        if(id !== null){
            const res = await enviarPeticion('GET','',('/peliculas/'+id),'',false);
            setGenero(res.data[0].genero);
            setTitulo(res.data[0].titulo);
            setSinopsis(res.data[0].sinopsis);
            setImagen(obtenerUrl()+res.data[0].imagen);
            setActores(res.data[0].actores);
            setDirectores(res.data[0].directores);
            setFranquicia(res.data[0].franquicia);
            setReview(res.data[0].review.split('*-*'));
            setFecha(res.data[0].fecha);
        }
    }
  return (
    <Container>
      <Row>
        <Col>
          <Card className='mt-5 bg-white mt-3 shadow text-center'>
            <CardBody>
            <CardTitle className='h3 text-center'>
            { titulo}
            </CardTitle>
            <Row>
                <Col md='9'>
                    <CardText className='text-justificado'>{ sinopsis }</CardText>
                    <CardText className='text-start'>Género: <b>{ genero }</b></CardText>
                    <CardText className='text-start'>Fecha de publicación: <b>{ fecha }</b></CardText>
                    <CardText className='text-start'>Actores principales: <b>{ actores }</b></CardText>
                    <CardText className='text-start'>Directores: <b>{ directores }</b></CardText>
                    <CardText className='text-start'>Franquicia: <b>{ franquicia }</b></CardText>
                </Col>
                <Col md='3'>
                    <img className='shadow mt-3 mt-md-0' src={imagen} height='250px'></img>
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col md='12'>
                    <div className="hr"></div>
                    <CardText className='h3 text-center'>Reseñas</CardText>
                </Col>    
                { review.map( (row,i)=>(
                    <Col md='12' key={i} className='border-bottom'>
                        <CardText className='text-start fst-italic'>{row}</CardText>
                    </Col>
                ))}
            </Row>
            <Row className='mt-3'>
                <Col md='12'>
                    <Form onSubmit={guardar}>
                        <InputGroup className='mt-5 mb-3'>
                            <InputGroupText><i className='fa-solid fa-comment'></i></InputGroupText>
                            <Input value={comentario} placeholder="Deja tu reseña"  onChange={(e) => setComentario(e.target.value)} required />
                        </InputGroup>
                        <p className='text-center mt-3'><Button color='dark'><i className='fa-solid fa-save'></i> Guardar</Button></p>
                    </Form>
                </Col>
            </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Detalle