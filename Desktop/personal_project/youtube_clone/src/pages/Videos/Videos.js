import { useParams } from "react-router-dom"
import {useQuery } from '@tanstack/react-query'
import {queryKeys} from "../../common/Constants";
import { Video } from "../../components/Video";
import {  YoutubeService } from "../../services/YoutubeService";
import { MockYoutubeService } from "../../services/MockYoutubeService";
import { commonSetting } from "../../setting/setting";


export const Videos = () => {
    const { keyword } = useParams() //get dynamic id from url
    // const getVideos = async () => {
    //     return axios.get(`/${queryKeys.videos}/${keyword ? 'search' : 'popular'}.json`).then((res) => res.data.items);
    // };

    const { isLoading, isError, data: videos, } = useQuery([queryKeys.videos, keyword], () => {
        const youtubeService = commonSetting.isProduct? new YoutubeService() : new MockYoutubeService(); 
        console.log(youtubeService);
        return youtubeService.search(keyword);
    }) //usequery: fail to get api, retrieve 모든게 저장되어 있음
    return (
    <>
        <div>Videos/{`${keyword ? keyword : ""}`}</div>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Something is wrong !</p>}
        {videos && videos.map((video) => <Video key={video.id.videoId} video={video}/>)}
    </>
    // use key value for rerendering otherwise undefined error => always rerendering & bad performance 
    )
}