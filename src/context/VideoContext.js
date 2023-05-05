import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import { queryKeys } from "../common/Constants";
import { MockVideoService } from "../services/MockVideoService";
import { MockYoutubeService } from "../services/MockYoutubeService";
import { YoutubeClient } from "../services/YoutubeClient.js";
import { YoutubeService } from "../services/YoutubeService";
import { commonSetting } from "../setting/setting";


const VideoContext = createContext();

export const VideoProvider = ({children}) => {
   
    const client = commonSetting.isProduct ? new YoutubeClient() : new MockYoutubeService(); 
    const videoAPI = new YoutubeService(client);
   console.log(videoAPI)
    return (<VideoContext.Provider value={{videoAPI}}>{children}</VideoContext.Provider>)
};

export const useVideos = () => useContext(VideoContext)