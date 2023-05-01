import { useLocation } from "react-router-dom";
import { ChannelInfo } from "../../components/ChannelInfo";
import { VideoPlayer } from "../../components/VideoPlayer/VideoPlayer";


export const VideoDetail = () => {
    const {state: {video}} = useLocation();
    const {title, channelId, channelTitle, description} = video.snippet;
    return (<div>
        <h1>Detail</h1> 
        { video ? <section>
            <iframe id="player" type="text/html" width="100%" height="650"
            src={`http://www.youtube.com/embed/${video.id}`}
            frameborder="0"/>
            <div>
                <h2>{title}</h2>
                <ChannelInfo channelId = {channelId} channelTitle = {channelTitle} />
                <pre>{description}</pre>
            </div>
        </section>: <VideoPlayer/> }
        </div>
    )
}