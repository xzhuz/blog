export const LIST_ALL_ARTICLE = 'LIST_ALL_ARTICLE';
export const LIST_PART_ARTICLE = 'LIST_PART_ARTICLE';
export const COUNT_ARTICLE = 'COUNT_ARTICLE';
export const LOAD_ARTICLE = 'LOAD_ARTICLE';
export const LOAD_POPULAR = 'LOAD_POPULAR';
export const PUBLISH_ARTICLE_MSG = 'PUBLISH_ARTICLE_MSG';
export const ARTICLE_UPDATED_MSG = 'ARTICLE_UPDATED_MSG';
export const MATCH_TAG_ARTICLE = 'MATCH_TAG_ARTICLE';
export const ALL_ARTICLE_TAGS = 'ALL_ARTICLE_TAGS';

export const loadArticle = (article) => {
    return {
        type: LOAD_ARTICLE,
        payload: article
    };
};

export const articleList = (article) => {
    return {
        type: LIST_ALL_ARTICLE,
        payload: article
    };
};

export const matchTagArticle = (article) => {
    return {
        type: MATCH_TAG_ARTICLE,
        payload: article
    };
};

export const loadPopularArticles = (article) => {
    return {
        type: LOAD_POPULAR,
        payload: article
    };
};

export const publishArticleMsg = (msg) => {
    return {
        type: PUBLISH_ARTICLE_MSG,
        msg
    };
};

export const updateArticleMsg = (msg) => {
    return {
        type: ARTICLE_UPDATED_MSG,
        msg
    };
};

export const allArticleTags = (tags) => {
    return {
        type: ALL_ARTICLE_TAGS,
        payload: tags
    };
};

export const listPartArticles = (articles) => {
    return {
        type: LIST_PART_ARTICLE,
        payload: articles
    };
};

/**
 * 统计博客数
 * @param count
 * @returns {{type: string, payload: *}}
 */
export const countArticles = (count) => {
    return {
        type: COUNT_ARTICLE,
        payload: count
    };
};

