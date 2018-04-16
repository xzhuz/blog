import * as Menu from './constants';

export function loadMenu(menuData) {
    return {
        type: Menu.LOAD_MENU,
        payload: menuData
    };
}
