import React, { ReactEventHandler } from 'react'
import styles from "../styles/TrackProgress.module.scss";

interface TrackProgressProps {
    left: number;
    right: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TrackProgress: React.FC<TrackProgressProps> = ({left, right, onChange}) => {
  return (
    <div className={styles.container}>
        <input type="range" min={0} max={right} value={left} onChange={onChange}/>
        <div>{left} / {right}</div>
    </div>
  )
}

export default TrackProgress