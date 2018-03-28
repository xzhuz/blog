export const RETURN_IMG_PATH = 'RETURN_IMG_PATH';
export const RETURN_COVER_IMG = 'RETURN_COVER_IMG';

export const getImgPath = (path) => {
    return {
        type: RETURN_IMG_PATH,
        payload: path
    };
};

export const getCoverImg = (path) => {
    return {
        type: RETURN_COVER_IMG,
        payload: path
    };
};
