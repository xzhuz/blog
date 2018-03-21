export const LOAD_MENU = 'LOAD_MENU';

export function loadMenu(menuData) {
    return {
        type: LOAD_MENU,
        payload: menuData
    };
}