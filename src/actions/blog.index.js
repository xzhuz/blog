export const LIST_POST = 'LIST_POST';
export const LOAD_POST = 'LOAD_POST';
export const LOAD_POPULAR = 'LOAD_POPULAR';
export const PUBLISH_BLOG = 'PUBLISH_BLOG';

export const postLoad = (post) => {
    return {
        type: LOAD_POST,
        payload: post
    };
};

export const postList = (post) => {
    return {
        type: LIST_POST,
        payload: post
    };
};

export const postPopular = (post) => {
    return {
        type: LOAD_POPULAR,
        payload: post
    };
};

export const blogPublish = (msg) => {
    return {
        type: PUBLISH_BLOG,
        msg
    };
};

