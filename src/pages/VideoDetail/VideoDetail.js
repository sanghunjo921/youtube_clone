import { useParams } from "react-router-dom";
import { queryKeys } from "../../common/Constants";
import {useQuery } from '@tanstack/react-query'
import { MockVideoService } from "../../services/MockVideoService";
import { useEffect, useRef, useState } from "react";

export const VideoDetail = () => {
    const videoElement = useRef();
    const videoContainerElement = useRef();
    const [volume, setVolume] = useState(0);
    const [screen, setScreen] = useState("Full");
    const [controlName, setControlName] = useState('play');
    const {videoId} = useParams();
    const { isLoading, isError, data: video, } = useQuery([queryKeys.videos, videoId], () => { 
        const videoService = new MockVideoService();
        console.log(videoService);
        return videoService.searchByTitle(videoId);
    }) //usequery: fail to get api, retrieve 모든게 저장되어 있음

    const playHandler = () => {
        if (controlName === 'play') {
            videoElement.current.play();
            setControlName('pause');
        } else {
            videoElement.current.pause()
            setControlName('play');
        }
        
    }

    const volumeHandler = (e) => {
        setVolume(e.target.value)
        videoElement.current.volume  = e.target.value
    }

    const screenHandler = () => {
        if (screen === 'Full') {
            videoContainerElement.current.requestFullscreen();
            setScreen('NotFull');
        } else {
            Document.exitFullscreen();
            setScreen('Full');
        }
    }


        // console.log(videoElement.current)
        // const videoEl = videoElement.current

        // videoEl.addEventListener('play', () => {
        //     setControlName("pause");
        // })
        // videoEl.addEventListener('pause', () => {
        //     setControlName('play');
        // })
   

    return <div>

        <h1>Detail</h1>
        {
            video && 
            <div ref={videoContainerElement}>
                <video name="media" width="600" height="400" controls  ref={videoElement}>
                    <source src={video.sources[0]} type="video/mp4"></source>
                </video> 
                <button onClick={playHandler}>{controlName}</button>
                <input type="range" min="0" max="1" step="0.1" value={volume} onChange={volumeHandler} />
                <button onClick={screenHandler}>{screen}</button>
            </div>
        }
        
    </div>
}