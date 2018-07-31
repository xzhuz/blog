import { get } from './http';


// Article

export const articleDetail = (id) => {
    return get('/articles/info', {id: id});
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

export const achieveArticle = () => {
    return get('/articles/achieve');
};


export const increaseVisit = (id) => {
    return get('/articles/visit', {id: id});
};


export const relativeArticles = ({tag, page, size}) => {
    return get('/articles/relative', {tag: new Array(tag).join(','), page: page, size: size});
};


export const doConfirmCompliment = (id) => {
    return get('/articles/compliment/confirm', {id: id});
};

export const doCancelCompliment = (id) => {
    return get('/articles/compliment/cancel', {id: id});
};
