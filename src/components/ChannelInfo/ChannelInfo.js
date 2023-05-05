import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../common/Constants";
import { useVideos } from "../../context/VideoContext";

export const ChannelInfo = ({ channelId, channelTitle }) => {
  const { videoAPI } = useVideos();
  const { data: url } = useQuery([queryKeys.channel, channelId], () => {
    console.log(videoAPI.getChannelInfo(channelId));
    return videoAPI.getChannelInfo(channelId);
  });
  return (
    <div className="flex my-4 mb-8 items-center">
      {url && (
        <img className="w-10 h-10 rounded-full" src={url} alt={channelTitle} />
      )}
      <p className="text-lg font-medium ml-2">{channelTitle}</p>
    </div>
  );
};
