import { queryKeys } from "../common/Constants";
import axios from "axios"

export class MockYoutubeService {
    constructor() {
        console.log("mockYoutube");
    }
 
    async search(keyword) {
        return keyword? this.#searchByKeyword(keyword) : this.#mostPopularVideos(); 
    }

    async #searchByKeyword(keyword) {
        return axios.get(`/${queryKeys.videos}/search.json`).then((res) => res.data.items);
    }

    async #mostPopularVideos() {
        return axios.get(`/${queryKeys.videos}/popular.json`).then((res) => res.data.items);
    }
}