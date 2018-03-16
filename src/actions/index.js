export const SHOW_POST = 'SHOW_POST';
export const LOAD_POST = 'LOAD_POST';

export const showPost = (id) => {
    return {
        type: SHOW_POST,
        id
    };
};

export const postList = (post) => {
    return {
        type: LOAD_POST,
        payload: post
    };
};
