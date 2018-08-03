import { get } from './http';


// Article

export const articleDetail = (id) => {
    return get('/blog/info', {id: id});
};


export const countArticle = () => {
    return get('/blog/count');
};

export const partArticles = ({page, size}) => {
    return get('/blog/part', {
        page: page,
        size: size,
    });
};

export const achieveArticle = () => {
    return get('/blog/achieve');
};


export const increaseVisit = (id) => {
    return get('/blog/visit', {id: id});
};


export const relativeArticles = ({tag, page, size}) => {
    return get('/blog/relative', {tag: new Array(tag).join(','), page: page, size: size});
};


export const doConfirmCompliment = (id) => {
    return get('/blog/compliment/confirm', {id: id});
};

export const doCancelCompliment = (id) => {
    return get('/blog/compliment/cancel', {id: id});
};
