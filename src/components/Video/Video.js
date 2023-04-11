import { Link } from "react-router-dom"

export const Video = ({video}) => {

    return <Link to={`/videos/watch/${video?.snippet?.title || video?.title}`}>{video?.snippet?.title || video?.description}</Link>
}