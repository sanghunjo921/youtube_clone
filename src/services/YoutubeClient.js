import axios from 'axios'
import { commonSetting } from '../setting/setting';

export class YoutubeClient {
    constructor() {
        this.apiClient = axios.create({
            baseURL: commonSetting.baseUrl,
            params: {
                key: commonSetting.apiKey
            }
        })
    }

    async search(params) {
        return this.apiClient.get("search", params);
    
    }
    
    async videos(params) {
        return this.apiClient.get("videos", params);
    
    } 

    async channels(params) {
        return this.apiClient.get('channels', params);
    }

    
}

