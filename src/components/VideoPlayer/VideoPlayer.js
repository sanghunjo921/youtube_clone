import { useLocation, useParams } from "react-router-dom";
import { queryKeys } from "../../common/Constants";
import {useQuery } from '@tanstack/react-query';
import { MockVideoService } from "../../services/MockVideoService";
import {  useEffect, useRef, useState } from "react";
import { timeFormat } from "../../common/util";
import styles from "./VideoPlayer.module.css";


export const VideoPlayer = () => {
    const { state } = useLocation();
    let timeoutForControlsId = null;
    let timeForMovement = null; 
    const videoElement = useRef();
    const controllerContainerEl = useRef();
    const [currentTime, setCurrentTime] = useState("0:00");
    const [duration, setDuration] = useState("0:00");
    const videoContainerElement = useRef();
    const [volume, setVolume] = useState(0);
    const [playTime, setPlayTime] = useState(0);
    const [screen, setScreen] = useState("Full");
    const [controlName, setControlName] = useState('pause');
    const {videoId} = useParams();
    const {  data: video, } = useQuery([queryKeys.videos, videoId], () => { 
        const videoService = new MockVideoService();
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
            videoElement.current.style.width = "100%";
            setScreen('NotFull');
        } else {
            document.exitFullscreen();
            setScreen('Full');
        }
    }

    
    useEffect(() => {
        if (videoElement.current) {
        videoElement.current.addEventListener("loadedmetadata", () => {
            setDuration(timeFormat(videoElement.current?.duration))
         })
        videoElement.current.addEventListener("timeupdate", () => {
            setCurrentTime(timeFormat(videoElement.current.currentTime));
            setPlayTime(videoElement.current?.currentTime)
        });

        videoContainerElement.current.addEventListener("mousemove", mouseMoveHandler, 500);
        videoContainerElement.current.addEventListener("mouseleave", mouseLeaveHandler, 100);
        setVolume(videoElement.current.volume)
    }
    }, [video])

    const playTimeHandler = (e) => {
        setPlayTime(e.target.value)
        videoElement.current.currentTime = e.target.value
    }

    const hideControls = () => {
        controllerContainerEl.current?.classList.remove("visible");
    }

    const mouseMoveHandler = (e) => {
        if (timeoutForControlsId) {
            clearTimeout(timeoutForControlsId)
            timeoutForControlsId = null
        }

        if (timeForMovement) {
            clearTimeout(timeForMovement)
            timeForMovement = null
        }

        controllerContainerEl.current.classList.add("visible");
        timeForMovement = setTimeout(hideControls, 2000)
    }

    const mouseLeaveHandler = () => {
        timeoutForControlsId = setTimeout(hideControls, 2000)
        
    }

    const getVolumeIcon = () => {
        if (volume === 0) {
            return <i className="fa-solid fa-volume-xmark"></i>
        } else if (volume >= 0.5) {
            return <i className="fa-solid fa-volume-high"></i>
        } else if (volume < 0.5) {
            return <i className="fa-solid fa-volume-low"></i>
        }
    }


    return <div>

        <h1>Detail</h1>
        {
            video && 
            <div ref={videoContainerElement} className={styles.videoContainer}>
                <video name="media"  ref={videoElement} autoPlay onClick={playHandler}>
                    <source src={video.sources[0]} type="video/mp4"></source>
                </video> 
                {   
                    
                    <div ref={controllerContainerEl} className={styles.videoContoller}>

                    
                    <input className={styles.statusBar} type="range" min="0" max= {Math.floor(videoElement.current?.duration)} step="1" value={playTime} onChange={playTimeHandler} />
                    

                        <div>
                            <button onClick={playHandler}>{controlName === 'play' ? <i className="fa-solid fa-play"></i> : <i className="fa-solid fa-pause"></i>}</button>
                        
                           <button> {getVolumeIcon()}</button>
                            
                            <input type="range" min="0" max="1" step="0.1" value={volume} onChange={volumeHandler} />
                            <div>
                    <span>
                        {currentTime}
                        </span> 
                         / 
                        <span>
                            {duration}
                        </span>
                    </div>
                        </div>
                        <div>
                        <button onClick={screenHandler}>{screen === 'Full' ? <i className="fa-solid fa-expand"></i> : <i className="fa-solid fa-compress"></i>}</button>
                        </div>
                    </div>
                    
                }
                           </div>
        }
        
    </div>
}