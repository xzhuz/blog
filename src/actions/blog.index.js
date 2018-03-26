export const LIST_ALL_POST = 'LIST_ALL_POST';
export const LOAD_POST = 'LOAD_POST';
export const LOAD_POPULAR = 'LOAD_POPULAR';
export const PUBLISH_BLOG = 'PUBLISH_BLOG';
export const BLOG_UPDATED = 'BLOG_UPDATED';

export const postLoad = (post) => {
    return {
        type: LOAD_POST,
        payload: post
    };
};

export const postList = (post) => {
    return {
        type: LIST_ALL_POST,
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

export const blogUpdated = (msg) => {
    return {
        type: BLOG_UPDATED,
        msg
    };
};

