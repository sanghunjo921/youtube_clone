import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../common/Constants";
import { useVideos } from "../../context/VideoContext";
import { Video } from "../Video";

export const RelatedVideos = ({ id }) => {
  const { videoAPI } = useVideos();
  const {
    isError,
    isLoading,
    data: videos,
  } = useQuery([queryKeys.relatedVideos, id], () => {
    console.log(videoAPI.getRelatedVideols(id), id);
    return videoAPI.getRelatedVideols(id);
  });
  console.log(videos);
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something is wrong !</p>}
      {videos && (
        <ul className="">
          {videos.map((video) => (
            <Video key={video.id} video={video} />
          ))}
        </ul>
      )}
    </>
  );
};
