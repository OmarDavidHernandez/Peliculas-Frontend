import React,{useEffect,useState} from 'react'
import {Container,Row,Col,Card,CardBody,CardTitle,CardText,Button,Form,InputGroup,InputGroupText,Input} from 'reactstrap'
import { enviarPeticion,obtenerUrl } from '../functiones'

const FormPeliculas = (parametros) => {
    const [genero,setGenero] = useState('');
    const [titulo,setTitulo] = useState('');
    const [sinopsis,setSinopsis] = useState('');
    const [fecha,setFecha] = useState('');
    const [actores,setActores] = useState('');
    const [directores,setDirectores] = useState('');
    const [franquicia,setFranquicia] = useState('');
    const [imagen,setImagen] = useState('');
    const [srcImg,setSrcImg] = useState('/img/default.png');
    const [requerida,setRequerida] = useState(true);
    let metodo = 'POST';
    let url = '/peliculas';
    
    useEffect( () =>{
        obtenerPelicula();
    },[]);
    const obtenerPelicula = async() =>{
        if(parametros.id !== null){
            const res = await enviarPeticion('GET','',(url+'/'+parametros.id),'',true);
            setGenero(res.data[0].genero);
            setTitulo(res.data[0].titulo);
            setSinopsis(res.data[0].sinopsis);
            setFecha(res.data[0].fecha2);
            setActores(res.data[0].actores);
            setDirectores(res.data[0].directores);
            setFranquicia(res.data[0].franquicia);
            setSrcImg(obtenerUrl()+res.data[0].imagen);
            setRequerida(false);
        }
    }
    const ver = (e) =>{
        setImagen(e.files[0]);
        setSrcImg(URL.createObjectURL(e.files[0]));
    }
    const guardar = async(e) =>{
        e.preventDefault();
        if(parametros.id !== null){
            metodo= 'PUT';
            url = '/peliculas/'+parametros.id;
        }
        const formData = new FormData();
        formData.append('genero', genero);
        formData.append('titulo', titulo);
        formData.append('sinopsis', sinopsis);
        formData.append('fecha', fecha);
        formData.append('actores', actores);
        formData.append('directores', directores);
        formData.append('franquicia', franquicia);
        if(imagen != ''){
            formData.append('imagen', imagen);
        }
        await enviarPeticion(metodo,formData,url,'/movies',true);
        
    }
  return (
    <Container>
      <Row>
        <Col>
        <Card className='mt-5 bg-white mt-3 shadow text-center'>
              <CardBody>
                  <CardTitle className=''>
                  <p className='h3 text-center'>{ parametros.titulo}</p>
                  </CardTitle>
                    <Row>
                        <Col md='9'>
                        <Form onSubmit={guardar}>
                            <InputGroup className='mt-5 mb-3'>
                                <InputGroupText><i className='fa-solid fa-clapperboard'></i></InputGroupText>
                                <Input value={titulo} placeholder="Título" onChange={(e) => setTitulo(e.target.value)} required />
                            </InputGroup>
                            <InputGroup className='mb-3'>
                                <InputGroupText><i className='fa-solid fa-film'></i></InputGroupText>
                                <Input value={genero} placeholder="Género" onChange={(e) => setGenero(e.target.value)} required />
                            </InputGroup>
                            <InputGroup className='mb-3'>
                                <InputGroupText><i className='fa-solid fa-message'></i></InputGroupText>
                                <Input value={sinopsis} placeholder="Sinopsis" onChange={(e) => setSinopsis(e.target.value)} required />
                            </InputGroup>
                            <InputGroup className='mt-3'>
                                <InputGroupText><i className='fa-solid fa-calendar'></i></InputGroupText>
                                <Input value={fecha} type='date' onChange={(e) => setFecha(e.target.value)} required />
                            </InputGroup>
                            <InputGroup className='mt-3'>
                                <InputGroupText><i className='fa-solid fa-users'></i></InputGroupText>
                                <Input value={actores} placeholder="Actores" onChange={(e) => setActores(e.target.value)} required />
                            </InputGroup>
                            <InputGroup className='mt-3'>
                                <InputGroupText><i className='fa-solid fa-user-tie'></i></InputGroupText>
                                <Input value={directores} placeholder="Directores" onChange={(e) => setDirectores(e.target.value)} required />
                            </InputGroup>
                            <InputGroup className='mt-3'>
                                <InputGroupText><i className='fa-solid fa-shop'></i></InputGroupText>
                                <Input value={franquicia} placeholder="Franquicia" onChange={(e) => setFranquicia(e.target.value)} required />
                            </InputGroup>
                            <InputGroup className='mt-3'>
                                <InputGroupText><i className='fa-solid fa-image'></i></InputGroupText>
                                <Input type='file' accept="image/png,image/jpeg" onChange={(e) => ver(e.target)} required={requerida} />
                            </InputGroup>
                            <p className='text-center mt-3'><Button color='dark'><i className='fa-solid fa-save'></i> Guardar</Button></p>
                        </Form>
                        </Col>
                        <Col md='3'>
                            <img className='shadow mt-md-5 img-fluid' src={srcImg} height='200px'></img>
                        </Col>
                    </Row>
              </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default FormPeliculas