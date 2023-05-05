import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import { queryKeys } from "../../common/Constants";
import { Video } from "../../components/Video";
import { useVideos } from "../../context/VideoContext";
import { MockVideoService } from "../../services/MockVideoService";
import { commonSetting } from "../../setting/setting";


export const Videos = () => {
    const { keyword } = useParams() //get dynamic id from url
    const {videoAPI} = useVideos();
    const { isLoading, isError, data: videos, } = useQuery([queryKeys.videos, keyword], () => {
        if (commonSetting.isVideoMock) {
            const videoService = new MockVideoService();
            return videoService.search();
        }
       
        return videoAPI.search(keyword);
    }) //usequery: fail to get api, retrieve 모든게 저장되어 있음
    return (
    <>
        <div>Videos/{`${keyword ? keyword : ""}`}</div>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Something is wrong !</p>}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4">
            {videos && videos.map((video) => <Video key={video?.id?.videoId || video?.id || video?.title} video={video}/>)}
        </ul>
    </>
    // use key value for rerendering otherwise undefined error => always rerendering & bad performance 
    )
}