
export class YoutubeService {
    constructor (apiClient) {
        this.apiClient = apiClient;
    }

    async search(keyword) {
        return keyword? this.#searchByKeyword(keyword) : this.#mostPopularVideos(); 
    }
 
    async #searchByKeyword(keyword) { // # in javascript, distinguish between private and public using #; having # means private 
        return this.apiClient.search({
            params: {
                part: 'snippet',
                maxResults: 25,
                type: "video",
                q: keyword,
            },
        }).then((res) => {
            console.log(res.data);
            return res.data.items.map((item) => ({ ...item, id: item.id.videoId }));
        });
    }


    async getChannelInfo(id) {
        return this.apiClient
          .channels({
            params: {
              id,
              part: "snippet",
            },
          })
          .then((res) => {
            console.log("channels:", res.data.items[0].snippet, id);
            return res.data.items[0].snippet.thumbnails.default.url;
          });
      }
 //getRelatedVideols
      
    async getRelatedVideols(relatedToVideoId) {
        return this.apiClient
        .search({
            params: {
            part: "snippet",
            maxResults: 25,
            type: "video",
            relatedToVideoId,
            },
        })
        .then((res) => {
            console.log(res);
            return res.data.items.map((item) => ({ ...item, id: item.id.videoId }));
        });
    }
    

    async #mostPopularVideos() {
        return this.apiClient.videos({
            params: {
                part: 'snippet',
                maxResults: 25,
                chart: "mostPopular",
                
            },
        }).then((res) => {
    
            return res.data.items
        });
    }
}


