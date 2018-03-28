export const RETURN_IMG_PATH = 'RETURN_IMG_PATH';

export const getImgPath = (path) => {
    return {
        type: RETURN_IMG_PATH,
        payload: path
    };
};
