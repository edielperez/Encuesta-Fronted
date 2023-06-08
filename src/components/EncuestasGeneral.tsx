import React, { useEffect, useState } from 'react'
import { Container, Button, Card, CardContent, Typography, CardActions, Fab, Modal, Box } from '@mui/material';
import { green, grey } from '@mui/material/colors';

const EncuestasGeneral: React.FC<{ surveys: [], handleEncuesta: (text: string) => void }> = (props) => {

  return (
    <>
      {props.surveys.length ? (props.surveys.map((survey: any) => (
        <Card key={survey._id} sx={{ marginBottom: 3, bgcolor: grey[100] }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {survey.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {survey.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="outlined" color="success" onClick={() => props.handleEncuesta(survey._id)}>
              Responder
            </Button>
            <Button variant="outlined" color="secondary">
              Editar
            </Button>
            <Button variant="outlined" color="error">
              Eliminar
            </Button>
          </CardActions>
        </Card>
      ))) : (<h1>No hay encuestas.</h1>)}
    </>
  )
}

export default EncuestasGeneral