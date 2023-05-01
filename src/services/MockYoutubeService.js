import { queryKeys } from "../common/Constants";
import axios from "axios"

export class MockYoutubeService {
    constructor() {
        console.log("mockYoutube");
    }
 
    async search(keyword) {
        return  axios.get(`/${queryKeys.videos}/search.json`);
    }

    async videos() {
        return axios.get(`/${queryKeys.videos}/popular.json`);
    }

}