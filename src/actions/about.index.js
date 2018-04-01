export const LOAD_ABOUT_ME = 'LOAD_ABOUT_ME';

export const loadAbout = (about) => {
    return {
        type: LOAD_ABOUT_ME,
        payload: about
    };
};