import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { ITrack } from '@/types/track'
import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material'
import { Grid, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import styles from "../styles/Player.module.scss"
import TrackProgress from './TrackProgress'

let audio: any;

const Player = () => {
    const {pause, volume, active, duration, currentTime} = useTypedSelector(state => state.player);
    const {pauseTrack, playTrack, setVolume, setActiveTrack, setCurrentTime, setDuration} = useActions();

    useEffect(() => {
        if(!audio) {
            audio = new Audio();
        } else {
            setAudio();
            play();
        }
    }, [active])
    
    const setAudio = () => {
        if(active) {
            audio.src = "http://localhost:9000/" + active.audio;
            audio.volume = volume / 100;
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration));
            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime));
            }
        }
    }
    
    const play = () => {
        if(pause) {
            playTrack();
            audio.play();
        } else {
            pauseTrack();
            audio.pause();
        }
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value) / 100;
        setVolume(Number(e.target.value));
    }

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value);
        setCurrentTime(Number(e.target.value));
    }

    if(!active) {
        return null;
    }
    
  return (
    <div className={styles.player}>
        <IconButton onClick={play}>
            {!pause 
                ? <Pause />
                : <PlayArrow />
            }
        </IconButton>
        <Grid container className={styles.track}>
            <div className={styles.info}>
                <h1>{active?.name}</h1>
                <h1>{active?.artist}</h1>
            </div>
        </Grid>
        <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime}/>
        <VolumeUp />
        <TrackProgress left={volume} right={100} onChange={changeVolume}/>
    </div>
  )
}

export default Player