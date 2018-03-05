export const SHOW_POST = 'SHOW_POST';

export const showPost = (id) => {
    return {
        type: SHOW_POST,
        id
    };
};