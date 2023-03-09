import Steps from '@/components/Steps'
import MainLayout from '@/layouts/Main.layout'
import { Button, Grid, SvgIcon, TextField } from '@mui/material'
import React, { useState } from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import styles from "../../styles/Create.module.scss";
import FileUpload from '@/components/FileUpload';
import { useInput } from '@/hooks/useInput';
import axios from 'axios';
import { useRouter } from 'next/router';

const Create = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState(null);
  const [audio, setAudio] = useState(null);
  const name = useInput("");
  const artist = useInput("");
  const text = useInput("");
  const router = useRouter();

  const next = async () => {
    if(activeStep !== 2) {
      setActiveStep(prev => prev += 1);
    } else {
      const formData = new FormData();
      formData.append("name", name.value);
      formData.append("artist", artist.value);
      formData.append("text", text.value);
      formData.append("picture", picture);
      formData.append("audio", audio);
      console.log(formData.get("picture"))
      await axios.post("http://localhost:9000/tracks", formData)
            .then(res => router.push("/tracks"))
            .catch(err => console.log(err));
    }
  }

  const prev = () => {
    setActiveStep(prev => prev - 1);
  }
  
  return (
    <MainLayout title="Загрузка трека">
        <Steps activeStep={activeStep}>
          {
            activeStep === 0 
            ? 
            <Grid container direction="column" className={styles.step}>
              <TextField
                label="Название трека"
                {...name}
              />
              <TextField
                label="Исполнитель"
                {...artist}
              />
              <TextField
                label="Слова к треку"
                multiline
                rows={5}
                {...text}
              />
            </Grid>
            : activeStep === 1
            ? <FileUpload accept={"image/*"} setFile={setPicture}>
                <Button>Загрузить изображение</Button>
              </FileUpload>
            : <FileUpload accept={"audio/*"} setFile={setAudio}>
                <Button>Загрузить аудио</Button>
              </FileUpload>
          }
        </Steps>
        <Grid container justifyContent="space-between" className={styles.navigation}>
          <button disabled={activeStep <= 0} onClick={prev}>
            <SvgIcon fontSize="large" component={ArrowBackIosIcon} color={activeStep <= 0 ? "disabled" : "primary"}/>
          </button>
          <button onClick={next}>
            <SvgIcon fontSize="large" component={ArrowForwardIosIcon} color="primary"/>
          </button>
        </Grid>
    </MainLayout>
  )
}

export default Create