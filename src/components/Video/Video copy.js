import { Link } from "react-router-dom"
import { format, register } from "timeago.js"
import koLocale from 'timeago.js/lib/lang/ko'

register('ko', koLocale)

export const Video = ({video}) => {
    const {thumbnails, title, publishedAt, channelTitle} = video.snippet;
    return (
        <li>
            <Link to={`/videos/watch/${video?.snippet?.title || video?.title}`}>
                {thumbnails && <img className="w-full" src={thumbnails.medium.url} alt = {title}/>}
                <div>
                    <p className="font-semibold my-2 line-clamp-2">{title || video?.description}</p>
                    <p className="text-sm opacity-80">{channelTitle}</p>
                    <p className="text-sm opacity-80">{format(publishedAt, "ko")}</p>
                </div>
            </Link>
        </li>
    )
}