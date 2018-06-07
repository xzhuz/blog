import {get, post} from './http';


// Article
export const articleList = () => {
    return get('/articles/list');
};

export const specifiedArticle = (id) => {
    return get('/articles/info', {id: id});
};

export const popularArticles = () => {
    return get('/articles/popular');
};

export const countArticle = () => {
    return get('/articles/count');
};

export const partArticles = ({page, size}) => {
    return get('/articles/part', {
        page: page,
        size: size,
    });
};

export const publishArticle = ({thumb, content, summary, title, tags, visit, publish}) => {
    return post('/articles/publish', {thumb, content, summary, title, tags: tags.join(','), visit, publish});
};

export const reduceVisit = (id) => {
    return get('/articles/visit', {id: id});
};

export const deleteArticle = (id) => {
    return get('/articles/delete', {id: id});
};

export const updateArticle = ({id, content, summary, title, tags, publish, thumb}) => {
    return post('/articles/update', {id, content, summary, title, tags: tags.join(','), publish, thumb});
};

export const relativeArticles = (tag) => {
    return get('/articles/relative', {tag: new Array(tag).join(',')});
};

export const allArticleTags = () => {
    return get('/articles/tags');
};

export const doConfirmCompliment = (id) => {
    return get('/articles/compliment/confirm', {id: id});
};

export const doCancelCompliment = (id) => {
    return get('/articles/compliment/cancel', {id: id});
};
