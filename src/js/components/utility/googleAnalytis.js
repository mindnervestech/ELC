import ReactGA from 'react-ga';

export const initialize = () => {
    ReactGA.initialize('UA-110960828-1');
}

export const pageview = () => {
    ReactGA.pageview(window.location.pathname + window.location.search);
}