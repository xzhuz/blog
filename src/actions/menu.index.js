export const LOAD_MENU = 'LOAD_MENU';
export const CHANGE_STATUS = 'CHANGE_STATUS';

export function loadMenu(menuData) {
    return {
        type: LOAD_MENU,
        payload: menuData
    };
}
