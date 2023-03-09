import { TrackAction, TrackActionTypes } from "@/types/track"
import axios from "axios"
import { Dispatch } from "react"

export const fetchTracks = (offset: number | null, count?: number) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await axios.get(`http://localhost:9000/tracks${offset ? "?offset=" + offset : ""}${count ? "?count=" + count : ""}`);
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data});
        } catch(err) {
            dispatch({type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: "Ошибка при загрузке треков"})
        }
    }
}


export const searchTracks = (query: string) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await axios.get("http://localhost:9000/tracks/search?query=" + query);
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data});
        } catch(err) {
            dispatch({type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: "Ошибка при загрузке треков"})
        }
    }
}