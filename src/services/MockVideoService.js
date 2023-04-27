import { videoMockData } from "../common/videoMock";

export class MockVideoService {
    constructor() {
        console.log("mockVideo");
    }
 
    async search(keyword) {
        return keyword? this.#searchByKeyword(keyword) : this.#mostPopularVideos(); 
    }

    async searchByTitle(title) {
        return (await this.#mostPopularVideos()).find(video => video.title == title)
    }

    async #searchByKeyword(keyword = '') {
        return videoMockData;
    }

    async #mostPopularVideos() {
        console.log(videoMockData.categories[0].videos);
        return videoMockData.categories[0].videos;
    }
}