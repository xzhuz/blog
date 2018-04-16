import * as Article from './constants';

export const loadArticle = (article) => {
    return {
        type: Article.LOAD_ARTICLE,
        payload: article
    };
};

export const articleList = (article) => {
    return {
        type: Article.LIST_ALL_ARTICLE,
        payload: article
    };
};

export const matchTagArticle = (article) => {
    return {
        type: Article.MATCH_TAG_ARTICLE,
        payload: article
    };
};

export const loadPopularArticles = (article) => {
    return {
        type: Article.LOAD_POPULAR,
        payload: article
    };
};

export const publishArticleMsg = (msg) => {
    return {
        type: Article.PUBLISH_ARTICLE_MSG,
        msg
    };
};

export const updateArticleMsg = (msg) => {
    return {
        type: Article.ARTICLE_UPDATED_MSG,
        msg
    };
};

export const allArticleTags = (tags) => {
    return {
        type: Article.ALL_ARTICLE_TAGS,
        payload: tags
    };
};

export const listPartArticles = (articles) => {
    return {
        type: Article.LIST_PART_ARTICLE,
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
        type: Article.COUNT_ARTICLE,
        payload: count
    };
};

/**
 * 清空消息
 * @returns {{type: string}}
 */
export const clearMsg = () => {
    return {
        type: Article.CLEAR_MSG,
    };
};

