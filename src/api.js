
import FetchPlease from 'fetch-please';

const API_KEY = 'Vr7NmBCxiA2KqxBc12722GaBiUIKRRy0';
const GIPHY_URL = 'http://api.giphy.com/v1/gifs';

let API = new FetchPlease(GIPHY_URL);

export const getGiphys = (selectedCategory, offset) => {
    return API.get('/search', {
        q: selectedCategory,
        offset: offset ? offset : 0,
        api_key: API_KEY
    })
}

export const abortGetGiphys = () => API.abort();
