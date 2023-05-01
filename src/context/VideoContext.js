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
    const { keyword } = useParams() //get dynamic id from url
    const { isLoading, isError, data: videos, } = useQuery([queryKeys.videos, keyword], () => {
        if (commonSetting.isVideoMock) {
            const videoService = new MockVideoService();
            return videoService.search();
        }
        const client = commonSetting.isProduct ? new YoutubeClient() : new MockYoutubeService(); 
        const youtube = new YoutubeService(client);
        return youtube.search(keyword);
    }) //usequery: fail to get api, retrieve 모든게 저장되어 있음
    return <VideoContext.Provider value={{videos, isLoading, isError}}>{children}</VideoContext.Provider>
};

export const useVideos = () => useContext(VideoContext)