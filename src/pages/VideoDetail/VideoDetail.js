import { useParams } from "react-router-dom";
import { queryKeys } from "../../common/Constants";
import {useQuery } from '@tanstack/react-query';
import { MockVideoService } from "../../services/MockVideoService";
import {  useEffect, useRef, useState } from "react";
import { timeFormat } from "../../common/util";
import styles from "./VideoDetail.module.css";
import throttle from 'lodash/throttle';


export const VideoDetail = () => {
    const videoElement = useRef();
    const controllerContainerEl = useRef();
    let timeoutId = null;
    const [currentTime, setCurrentTime] = useState("0:00");
    const [duration, setDuration] = useState("0:00");
    const videoContainerElement = useRef();
    const [volume, setVolume] = useState(0);
    const [playTime, setPlayTime] = useState(0);
    const [screen, setScreen] = useState("Full");
    const [controlName, setControlName] = useState('play');
    const {videoId} = useParams();
    const {  data: video, } = useQuery([queryKeys.videos, videoId], () => { 
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
            videoElement.current.style.width = "100%";
            setScreen('NotFull');
        } else {
            document.exitFullscreen();
            setScreen('Full');
        }
    }

    
    useEffect(() => {
        videoElement.current?.addEventListener("loadedmetadata", () => {
            setDuration(timeFormat(videoElement.current?.duration))
         })
        videoElement.current?.addEventListener("timeupdate", () => {
            setCurrentTime(timeFormat(videoElement.current?.currentTime));
            setPlayTime(videoElement.current?.currentTime)
        });

        videoElement.current?.addEventListener("mousemove", throttle(mouseMoveHandler, 300));
        videoElement.current?.addEventListener("mouseleave", throttle(mouseLeaveHandler, 300));
    }, [video])

    const playTimeHandler = (e) => {
        setPlayTime(e.target.value)
        videoElement.current.currentTime = e.target.value
    }

    const mouseMoveHandler = (e) => {
        console.log(e.target)
        if (timeoutId) {
            clearTimeout(timeoutId)
            timeoutId = null
        }
        timeoutId = setTimeout(() => {
            controllerContainerEl.current.classList.add("visible");
        }, 500)

    }

    const mouseLeaveHandler = () => {
        if (timeoutId) {
            clearTimeout(timeoutId)
            timeoutId = null
        }
        timeoutId = setTimeout(() => {
            controllerContainerEl.current.classList.remove("visible");
        }, 500)
        
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
                    <button onClick={playHandler}>{controlName === 'play' ? <i className="fa-solid fa-play"></i> : <i className="fa-solid fa-pause"></i>}</button>
                    <input type="range" min="0" max="1" step="0.1" value={volume} onChange={volumeHandler} />
                    <button onClick={screenHandler}>{screen === 'Full' ? <i className="fa-solid fa-expand"></i> : <i className="fa-solid fa-compress"></i>}</button>
                    <button><i className="fa-solid fa-volume-low"></i></button>
                    <button><i className="fa-solid fa-volume-slash"></i></button>
                    <button><i className="fa-solid fa-volume-high"></i></button>
                        <div>
                        <span>
                            {currentTime}
                            </span> 
                             / 
                            <span>
                                {duration}
                            </span>
                        </div>
                        <input type="range" min="0" max= {Math.floor(videoElement.current?.duration)} step="1" value={playTime} onChange={playTimeHandler} />

                    </div>
                }
                           </div>
        }
        
    </div>
}