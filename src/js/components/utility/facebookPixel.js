import ReactPixel from 'react-facebook-pixel';

export const initializeF = () => {
    ReactPixel.init('106750189749156');
}

export const pageViewF = () => {
    ReactPixel.pageView(); 
}

export const trackF = (name, value) => {
    ReactPixel.track(name, value);
}