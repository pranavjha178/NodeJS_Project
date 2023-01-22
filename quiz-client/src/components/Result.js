import { Alert, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { createAPIEndpoint, ENDPOINTS } from '../api'
import { getFormatedTime } from '../helper';
import useStateContext from '../hooks/useStateContext'
import { green } from '@mui/material/colors';
import Answer from './Answer';

export default function Result() {
  const {context, setContext } = useStateContext()
  const [score, setScore] = useState(0)
  const [qnAnswers, setQnAnswers] = useState([])
  const [showAlert, setShowAlert] = useState(false)
  const [showSendResult, setShowSendResult] = useState(false)
  const [emailtemplate, setEmailTemplate] = useState();
  const navigate = useNavigate()


  useEffect(() => {
    const ids = context.selectedOptions.map((x) => x.qnId);
    //{console.log("select ids array: ", ids.toString())}
    createAPIEndpoint(ENDPOINTS.getAnswers)
      .post({ list: ids.toString() })
      .then((res) => {
        const qna = context.selectedOptions.map((x) => ({
          ...x,
          ...res.data.find((y) => y.qnId === x.qnId),
        }));
        setQnAnswers(qna);
        calculateScore(qna);
        // console.log(qna);
      })
      .catch((err) => console.log("error" + err));
  }, []);    

  useEffect(() =>{
  emailtemplate1();
},[qnAnswers,score])

  const calculateScore = qna => {    
    let tempScore = qna.reduce((acc, curr) => {
      return curr.answer === curr.selected ? acc + 1 : acc;
    }, 0)
    setScore(tempScore)
  }
  
  function emailtemplate1(){
    // console.log(qnAnswers);
     const emailmessage = "<p>Dear "  + context.participantName + ",</p>" + 
      "<p>Thank you for participating in our Quiz Olympiad.</p>" + 
      "<p>Here is your result - </p>"+
      "<p>Score: <b>" + score +"</b></p>" +  
      qnAnswers.map((data) => "<p>Q. " + data.qnInWords + "<br/> <br/> <ul><li>" + data.Option1 + "</li><li>" + data.Option2 + "</li><li>" + data.Option3 + "</li><li>" + data.Option4 + "</li></ul><br/><b> Correct Answer: " + data.answer + " </b><br/><b>Your Selection: " + data.selected + "</b></p>") +
      "<p>Best Wishes, <br/>Team@EdusoftKVers</p>" 

      console.log(emailmessage, context.participantEmail);
      setEmailTemplate(emailmessage);
   }

  
  // useEffect (() =>{
    
  // },[])
  
//  console.log(emailmessage)
  
  
  const restart = () => {
    setContext({
      timeTaken: 0,
      selectedOptions: []
    })
    navigate("/quiz")
  }

  const submitScore = () => {
    createAPIEndpoint(ENDPOINTS.participant)
      .put(context.participantId, {
        participantId: context.participantId,
        score: score,
        timeTaken: context.timeTaken
      })
      .then(res => {
        setShowAlert(true)
        setTimeout(() => {
           setShowAlert(false)
        }, 4000);
      })
      .catch(err => { console.log(err) })
  }

  const emailResult = () => {   
    // emailResult ();
       
    createAPIEndpoint(ENDPOINTS.sendEmail)
      .post({to:context.participantEmail, subject:"Quiz Result", message:emailtemplate})
      .then(res => {
        setShowSendResult(true)
        setTimeout(() => {
          setShowSendResult(false)
        }, 4000);
      })
      .catch(err => { console.log(err) })
  }

  return (
    <>
      <Card sx={{ mt: 5, display: 'flex', width: '100%', maxWidth: 640, mx: 'auto' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <CardContent sx={{ flex: '1 0 auto', textAlign: 'center' }}>
            <Typography variant="h4">Congratulations!</Typography>
            <Typography variant="h6">
              YOUR SCORE
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              <Typography variant="span" color={green[500]}>
                {score}
              </Typography>/5
            </Typography>
            <Typography variant="h6">
              Took {getFormatedTime(context.timeTaken) + ' mins'}
            </Typography>
            <Button variant="contained"
              sx={{ mx: 1 }}
              size="small"
              onClick={submitScore}>
              Submit
            </Button>
            <Button variant="contained"
              sx={{ mx: 1 }}
              size="small"
              onClick={restart}>
              Re-try
            </Button>
            <Button variant="contained"
              sx={{ mx: 1 }}
              size="small"
              onClick={emailResult}>
              Email-Result
            </Button>
            <Alert
              severity="success"
              variant="string"
              sx={{
                width: '60%',
                m: 'auto',
                visibility: showAlert ? 'visible' : 'hidden'
              }}>
              Score Updated.
            </Alert>
            <Alert
              severity="success"
              variant="string"
              sx={{
                width: '60%',
                m: 'auto',
                visibility: showSendResult ? 'visible' : 'hidden'
              }}>
              Quiz Result Email Sent Successfully
            </Alert>
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 220 }}
          image="./result.png"
        />
      </Card>
      <Answer qnAnswers={qnAnswers} />
    </>
  )
}
