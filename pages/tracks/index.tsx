import TrackList from '@/components/TrackList'
import useDebounce from '@/hooks/useDebounce'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import MainLayout from '@/layouts/Main.layout'
import { NextThunkDispatch, wrapper } from '@/store'
import { fetchTracks, searchTracks } from '@/store/actions-creators/track'
import { Box, Button, Card, Grid, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from "../../styles/Tracks.module.scss";

export const getServerSideProps = wrapper.getServerSideProps(
    store => async ({query}) => {
        const dispatch = store.dispatch as NextThunkDispatch;
        await dispatch(fetchTracks(query.offset ? +query.offset : null));

        return { props: {} }
    }
);

const Index = () => {
    const router = useRouter();
    const {tracks, error} = useTypedSelector(state => state.track)
    const [query, setQuery] = useState<string>("");
    const debouncedSearch = useDebounce(search, 500);
    const dispatch = useDispatch() as NextThunkDispatch;
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 7;
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        if(fetching) {
            loadMore().then(r => setCurrentPage(prev => prev + 1));
        }


        async function loadMore() {
            try {
                await dispatch(await fetchTracks(currentPage * limit));
            } catch(err) {
                console.log(err);
            } finally {
                setFetching(false);
            }
        }
    }, [fetching])

    useEffect(() => {
        document.addEventListener("scroll", scrollHandler);

        return () => {
            document.removeEventListener("scroll", scrollHandler);
        }
    })

    function scrollHandler(e: Event) {
        if(document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 100) {
            setFetching(true);
        }
    }

    if(error) {
        return (
            <MainLayout title="Список треков">
                <h1>{error}</h1>
            </MainLayout>
        )
    }

    async function search(e: React.ChangeEvent<HTMLInputElement>) {
        await dispatch(await searchTracks(e.target.value));
    }

    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        await debouncedSearch(e);
    }
    
  return (
    <MainLayout title='Список треков'>
        <Grid container justifyContent="center">
            <Card className={styles["track-card"]}>
                <Box p={3}>
                    <Grid container justifyContent="space-between">
                        <h1>Треки</h1>
                        <Button onClick={() => router.push("/tracks/create")}>Загрузить</Button>
                    </Grid>
                </Box>
                <TextField 
                    fullWidth
                    value={query}
                    onChange={onChange}
                    label="Поиск"
                />
                <TrackList tracks={tracks}/>
            </Card>
        </Grid>
    </MainLayout>
  )
}

export default Index

  