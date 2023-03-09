import { Card, Container, Grid, Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';
import styles from "../styles/Steps.module.scss";

interface StepProps {
    activeStep: number;
    children: string | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactElement<any, string | React.JSXElementConstructor<any>>[];
}

const steps = ["Информация о треке", "Загрузка обложки", "Загрузка аудиодорожки"];

const Steps: React.FC<StepProps> = ({activeStep, children}) => {
  return (
    <Container>
        <Stepper activeStep={activeStep}>
            {steps.map((step, idx) =>
                <Step
                    key={idx}
                    completed={activeStep > idx}
                >
                    <StepLabel>{step}</StepLabel>
                </Step>
            )}
        </Stepper>
        <Grid container justifyContent="center" className={styles.children}>
            <Card className={styles.card}>
                {children}
            </Card>
        </Grid>
    </Container>
  )
}

export default Steps