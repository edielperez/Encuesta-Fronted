import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Button, Card, CardContent, Typography, CardActions, Fab, Modal, Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, makeStyles } from '@mui/material';
import { green, grey } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import EncuestasGeneral from './components/EncuestasGeneral';
import { URL_BASE } from './utils/conection';
import FormSurvey from './components/FormSurvey';


function App() {
  const [surveys, setSurveys] = useState<any>([]);
  const [questions, setQuestions] = useState<[]>([]);
  const [open, setOpen] = useState(false)
  const [isOpen, setisOpen] = useState(false)
  const [idSurvey, setIdSurvey] = useState('')
  const [responses, setResponses] = useState<any>({});
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState<[]>([]);
  const [isShowResult, setIsShowResult] = useState(false);


  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false);
  };



  const handleResponseChange = (questionId: string, value: string) => {
    setResponses((prevResponses: any) => ({
      ...prevResponses,
      [questionId]: value,
    }));
  };

  const handleButton = () => {
    const allQuestionsAnswered = Object.keys(responses).length === questions.length;

    if (allQuestionsAnswered) {
      // Todas las preguntas han sido respondidas
      setIsComplete(true);
      for (const [questionId, seletedOption] of Object.entries(responses)) {

        axios.post(URL_BASE + 'response/', { idSurvey, questionId, seletedOption })
          .then(() => {
            console.log('Respuesta guardadas correctamente');
          })
          .catch(error => {
            console.error('Error al registrar respuesta:', error);
          });

      }

    } else {
      // Faltan preguntas por responder
      setIsComplete(false);
      alert('Por favor, responde todas las preguntas.');
    }
  };

  const handleShowResults = () => {
    if (!isShowResult) {
      axios.get(URL_BASE + 'response/api/results/' + idSurvey)
        .then(response => {
          setResults(response.data);
          setIsShowResult(true)
        })
        .catch(error => {
          console.error('Error al obtener las encuestas', error);
        });
    }
  }

  const handleEncuesta = (idsur: string) => {
    setIdSurvey(idsur)
    setisOpen(true)
    axios.get(URL_BASE + 'question/' + idsur)
      .then(response => {
        setQuestions(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las encuestas', error);
      });
  }
  useEffect(() => {
    // Obtener todas las encuestas al cargar el componente
    axios.get(URL_BASE + 'survey')
      .then(response => {
        setSurveys(response.data);
      })
      .catch(error => {
        console.error('Error al obtener las encuestas', error);
      });
  }, []);
  return (
    <Container >
      {isOpen ? (
        <>
          {questions && (questions.map((question: any) => (
            <div key={question._id}>
              <FormControl key={question._id} required>
                <FormLabel id={question._id} key={question._id} >{question.question}</FormLabel>
                <RadioGroup
                  aria-labelledby={question._id}
                  name={question._id}
                  value={responses[question._id] || ''}
                  onChange={(e) => handleResponseChange(question._id, e.target.value)
                  }
                >
                  {question.option.length && question.options.map((option: string) => (
                    <FormControlLabel value={option} control={<Radio />} label={option} key={option} />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          )))}
          <button onClick={handleButton}>Guardar respuestas</button>
          {isComplete && (
            <>
              <p>Todas las preguntas han sido respondidas.</p>
              <button onClick={handleShowResults}>Mostrar resultados</button>
              {isShowResult && (
                <>
                  <div>
                    <h1>Resultados de la Encuesta</h1>
                    <ul>
                      {results.map((result: any) => (
                        <>
                          <li key={result._id.question}></li>
                          <li key={result._id.question}>
                            Pregunta: {result._id.question}
                            Opción: {result._id.seletedOption} - Cantidad: {result.count}
                          </li>
                        </>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <div>
            <h1>Encuestas</h1>
          </div>
          <EncuestasGeneral surveys={surveys} handleEncuesta={handleEncuesta} />
          <FormSurvey />
        </>
      )}

    </Container>
  );
}

export default App;
