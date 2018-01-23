
const API_KEY = 'Vr7NmBCxiA2KqxBc12722GaBiUIKRRy0';
const GIPHY_URL = 'http://api.giphy.com/v1/gifs';

export const getGiphys = (selectedCategory, offset) => {
    const page = `&offset=${offset ? offset : 0}`;
    const CONSUTRCTED_WEATHER_URL = `${GIPHY_URL}/search?q=${selectedCategory}${page}&api_key=${API_KEY}`;
    return fetch(CONSUTRCTED_WEATHER_URL)
        .then(res => res.json())
        .then(res => res.meta.status === 200 ? res : { ...res, error: true })
}