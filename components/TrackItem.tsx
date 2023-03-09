import { useActions } from '@/hooks/useActions';
import { ITrack } from '@/types/track';
import { Pause, PlayArrow } from '@mui/icons-material';
import { Card, Grid, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import styles from "../styles/TrackItem.module.scss"

interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({track, active = false}) => {
  const router = useRouter();
  const {playTrack, pauseTrack, setActiveTrack} = useActions();

  const play = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveTrack(track);
    playTrack();
  }

  return (
    <Card className={styles.track} onClick={() => router.push("tracks/" + track._id)}>
      <IconButton onClick={play}>
          {active
            ? <Pause />
            : <PlayArrow />
          }
      </IconButton>
      <img width={70} height={70} src={"http://localhost:9000/" + track.picture} />
      <Grid container direction="column" className={styles.info}>
        <div>{track.name}</div>
        <div>{track.artist}</div>
      </Grid>
      {active && <div>02:42 / 03: 22</div>}

    </Card>
  )
}

export default TrackItem