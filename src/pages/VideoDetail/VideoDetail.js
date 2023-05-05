import { useLocation } from "react-router-dom";
import { ChannelInfo } from "../../components/ChannelInfo";
import { RelatedVideos } from "../../components/RelatedVideos";
import { VideoPlayer } from "../../components/VideoPlayer/VideoPlayer";

export const VideoDetail = () => {
  const {
    state: { video },
  } = useLocation();
  const { title, channelId, channelTitle, description } = video.snippet;
  return (
    <section className="flex flex-col lg:flex-row">
      {video ? (
        <article className="basis-4/6">
          <iframe
            id="player"
            type="text/html"
            width="100%"
            height="650"
            src={`http://www.youtube.com/embed/${video.id}`}
            frameborder="0"
          />
          <div className="p-8">
            <h2 className="text-lg font-bold">{title}</h2>
            <ChannelInfo channelId={channelId} channelTitle={channelTitle} />
            <pre className="whitespace-pre-wrap">{description}</pre>
          </div>
        </article>
      ) : (
        <VideoPlayer />
      )}
      <article className="basis-2/6">
        <RelatedVideos id={video.id} />
      </article>
    </section>
  );
};
