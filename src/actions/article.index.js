export const LIST_ALL_ARTICLE = 'LIST_ALL_ARTICLE';
export const LOAD_ARTICLE = 'LOAD_ARTICLE';
export const LOAD_POPULAR = 'LOAD_POPULAR';
export const PUBLISH_ARTICLE = 'PUBLISH_ARTICLE';
export const ARTICLE_UPDATED = 'ARTICLE_UPDATED';
export const MATCH_TAG_ARTICLE = 'MATCH_TAG_ARTICLE';
export const ALL_ARTICLE_TAGS = 'ALL_ARTICLE_TAGS';

export const articleLoad = (post) => {
    return {
        type: LOAD_ARTICLE,
        payload: post
    };
};

export const articleList = (post) => {
    return {
        type: LIST_ALL_ARTICLE,
        payload: post
    };
};

export const matchTagArticle = (post) => {
    return {
        type: MATCH_TAG_ARTICLE,
        payload: post
    };
};

export const articlePopular = (post) => {
    return {
        type: LOAD_POPULAR,
        payload: post
    };
};

export const articlePublish = (msg) => {
    return {
        type: PUBLISH_ARTICLE,
        msg
    };
};

export const articleUpdated = (msg) => {
    return {
        type: ARTICLE_UPDATED,
        msg
    };
};

export const allArticleTags = (tags) => {
    return {
        type: ALL_ARTICLE_TAGS,
        payload: tags
    };
};

