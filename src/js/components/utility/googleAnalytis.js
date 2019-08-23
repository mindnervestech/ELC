import ReactGA from 'react-ga';

export const initialize = () => {
    ReactGA.initialize('UA-132980025-2');
}

export const pageview = () => {
    ReactGA.pageview(window.location.pathname + window.location.search);
}