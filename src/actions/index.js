export const SHOW_POST = 'SHOW_POST';
export const LOAD_POST = 'LOAD_POST';

export const postList = (posts) => {
    return {
        type: LOAD_POST,
        payload: posts
    };
};

export const showPost = (post) => {
    return {
        type: SHOW_POST,
        payload: post
    };
};