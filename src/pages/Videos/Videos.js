import { useParams } from "react-router-dom"
import { Video } from "../../components/Video";
import { useVideos } from "../../context/VideoContext";


export const Videos = () => {
    const { keyword } = useParams() //get dynamic id from url
    const {videos, isLoading, isError} = useVideos();
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