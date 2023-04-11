import axios from 'axios'
import { commonSetting } from '../setting/setting';


export class YoutubeService {
    constructor () {
        this.apiClients = axios.create({
            baseURL: commonSetting.baseUrl,
            params: {
                key: commonSetting.apiKey,
            }
        })
    }

    async search(keyword) {
        return keyword? this.#searchByKeyword(keyword) : this.#mostPopularVideos(); 
    }
 
    async #searchByKeyword(keyword) { // # in javascript, distinguish between private and public using #; having # means private 
        return this.apiClients.get("search", {
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

    async #mostPopularVideos() {
        return this.apiClients.get("videos", {
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


