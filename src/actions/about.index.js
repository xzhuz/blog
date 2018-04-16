import * as About from "./constants";

export const loadAbout = (about) => {
    return {
        type: About.LOAD_ABOUT_ME,
        payload: about
    };
};

export const updateAboutSuccess = (msg) => {
    return {
        type: About.UPDATE_ABOUT_SUCCESS,
        msg
    };
};

/**
 * 清空消息
 * @returns {{type: string}}
 */
export const clearMsg = () => {
    return {
        type: About.CLEAR_MSG,
    };
};