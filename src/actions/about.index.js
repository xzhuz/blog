export const LOAD_ABOUT_ME = 'LOAD_ABOUT_ME';
export const UPDATE_ABOUT_SUCCESS = 'UPDATE_ABOUT_SUCCESS';

export const loadAbout = (about) => {
    return {
        type: LOAD_ABOUT_ME,
        payload: about
    };
};

export const updateAboutSuccess = (msg) => {
    return {
        type: UPDATE_ABOUT_SUCCESS,
        msg
    };
};