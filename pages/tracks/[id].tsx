import MainLayout from '@/layouts/Main.layout';
import { ITrack } from '@/types/track';
import { Button, Grid, SvgIcon, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import styles from "../../styles/TrackPage.module.scss";
import HeadphonesIcon from '@mui/icons-material/Headphones';
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { useInput } from '@/hooks/useInput';

const TrackPage = ({serverTrack}: any) => {
    const [track, setTrack] = useState<ITrack>(serverTrack);
    const router = useRouter();
    const text = useInput("");

    const addComment = async() => {
        try {
            const response = await axios.post("http://localhost:9000/tracks/comment", {
                username: "a",
                text: text.value,
                trackId: track._id,
            })
            setTrack({...track, comments: [...track.comments, response.data]});
        } catch(err) {
            console.log(err);
        }
    }
    
  return (
    <MainLayout title={[track.name, track.artist].join(' - ')} keywords={"Музыка, исполнители, " + track.name + ", " + track.artist}>
        <SvgIcon component={ArrowBackIosIcon} color="primary" fontSize='large' onClick={() => router.push("/tracks")}/>
        <Grid container className={styles.track}>
            <img src={"http://localhost:9000/" + track.picture} alt="Track picture" width={200} height={200}/>
            <div className={styles.info}>
                <h1>{track.name}</h1>
                <h1>{track.artist}</h1>
                <h1 className={styles.listens}>
                    <SvgIcon component={HeadphonesIcon} fontSize="large"/>
                    {track.listens}
                </h1>
            </div>
        </Grid>
        <h1>Текст песни</h1>
        <p>{track.text}</p>
        <h1>Комментарии</h1>
        <Grid container>
            <TextField 
                label="Комментарий..."
                {...text}
                multiline
                fullWidth
                rows={5}
            />
            <Button onClick={addComment}>Оставить комментарий</Button>
        </Grid>
        <div>
            {track.comments.map(c =>
                <div>
                    <div>{c.username}</div>
                    <div>{c.text}</div>
                </div> 
            )}
        </div>
    </MainLayout>
  )
}

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async({params}) => {
    const response = await axios.get("http://localhost:9000/tracks/" + params?.id);
    return {
        props: {
            serverTrack: response.data,
        }
    }
}