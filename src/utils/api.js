import {get} from './http';


// Article
export function countArticle() {
    return get('/articles/count');
}