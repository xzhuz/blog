import * as File from './constants';
export const getImgPath = (path) => {
    return {
        type: File.RETURN_IMG_PATH,
        payload: path
    };
};

export const getThumb = (path) => {
    return {
        type: File.RETURN_THUMB_IMG,
        payload: path
    };
};
