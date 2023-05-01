
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
            return res.data.items
        });
    }


    async getChannelInfo(id) {
        this.apiClient.channels({
            params: {
                id,part: 'snippet',
            }
        }).then((res) => res.data.items[0].snippet
        )
    }

    async #mostPopularVideos() {
        return this.apiClient.videos({
            params: {
                part: 'snippet',
                maxResults: 25,
                chart: "mostPopular",
                
            },
        }).then((res) => {
            console.log(res.data);
            return res.data.items
        });
    }
}


