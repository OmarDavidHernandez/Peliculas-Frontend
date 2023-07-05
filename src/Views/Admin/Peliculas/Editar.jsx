import React from 'react'
import FormPelicula from '../../../Components/FormPelicula'
import { useParams } from 'react-router-dom'

const EditarPelicula = () => {
  const {id} = useParams();
  return (
    <FormPelicula id={id} titulo='Editar película' />
  )
}

export default EditarPelicula