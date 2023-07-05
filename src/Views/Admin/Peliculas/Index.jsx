import React from 'react'
import {Link} from 'react-router-dom'
import {Container,Row,Col,Table,Card,CardBody,CardTitle,CardText,Button} from 'reactstrap'
import {useState,useEffect} from 'react'
import {confirmacion,enviarPeticion,obtenerUrl} from '../../../functiones'

const IndexPeliculas = () => {
    useEffect(()=>{
        obtenerPeliculas();
      },[]);
      const [peliculas,setPeliculas] = useState([]);
      const obtenerPeliculas = async() =>{
        const res = await enviarPeticion('GET','','/peliculas','',true);
        setPeliculas(res.data);
      }
      const eliminarPelicula = (id,nombre) =>{
        confirmacion(nombre,('/peliculas/'+id),'/movies','',true);
      }
  return (
    <Container>
      <Row className='mt-5'>
        <Col>
          <Card className='mt-5 bg-white mt-3 shadow text-center'>
              <CardBody>
                  <CardTitle className=''>
                    <Link to={'/crear-movie'} className='btn btn-primary'><i className='fa-solid fa-circle-plus'></i> Añadir</Link>
                  </CardTitle>
                    <Table responsive bordered striped>
                      <thead>
                        <tr><th>#</th><th>GENERO</th><th>TITULO</th><th>SINOPSIS</th><th>FECHA</th><th>ACTORES</th><th>DIRECTORES</th><th>FRANQUICIA</th><th>IMAGEN</th><th></th><th></th></tr>
                      </thead>
                      <tbody className='table-group-divider'>
                      { peliculas.map( (row,i)=>(
                        <tr key={row.id}>
                          <td>{ (i+1) }</td>
                          <td>{ row.genero}</td>
                          <td>{ row.titulo}</td>
                          <td>{ row.sinopsis}</td>
                          <td>{ row.fecha}</td>
                          <td>{ row.actores}</td>
                          <td>{ row.directores}</td>
                          <td>{ row.franquicia}</td>
                          <td><img src={obtenerUrl()+row.imagen} height='80px' /></td>
                          <td>
                            <Link to={'/editar-movie/'+row.id} className='btn btn-warning'><i className='fa-solid fa-edit'></i></Link>
                          </td>
                          <td><Button color='danger' onClick={()=> eliminarPelicula(row.id,row.titulo)}>
                            <i className='fa-solid fa-trash'></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                </Table>
              </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default IndexPeliculas