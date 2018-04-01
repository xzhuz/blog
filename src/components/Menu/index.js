import React from 'react';
import PropTypes from 'prop-types';

import './menu.scss';

class Menu extends React.PureComponent {

    renderMenu({menuId, name, children, order}) {
        return (
            <li key={menuId}>
                <a href={`#${order}`} className={'article-menu-item'}>{name}</a>
                { this.renderChild(children)}
            </li>
        );
    }

    renderChild(children){
        return (
            <ul>
                {
                    children.map((v) => (
                        this.renderMenu(v)
                    ))
                }
            </ul>
        );
    }

    generateMenuList(menu) {
        const menuOrder = menu.map(v => {
            return v.substring(v.indexOf('>') + 1, v.lastIndexOf('<')).trim();
        });
        let m = [];
        menuOrder.forEach((v, index) => {
            const order = v.substring(0, v.search(/\s+/));
            const name = v.substring(v.lastIndexOf(" ") + 1, v.length);
            let level = 0;
            if (order.indexOf('.') < 0) {
                // 一级标题
                m = [...m, {
                    menuId: index,
                    order: order,
                    name: name,
                    children: []
                }];
            } else if ((level = order.split('.').length) > 1) {
                switch (level) {
                    case 2:
                        let grandfather = m[m.length - 1];
                        grandfather.children = [...grandfather.children, {
                            menuId: index,
                            order: order,
                            name: name,
                            children: []
                        }];
                        break;
                    case 3:
                        grandfather = m[m.length - 1];
                        let father = grandfather.children[grandfather.children.length - 1];
                        father.children = [...father.children, {
                            menuId: index,
                            order: order,
                            name: name,
                            children: []
                        }];
                        break;
                    case 4:
                        grandfather = m[m.length - 1];
                        father = grandfather.children[grandfather.children.length - 1];
                        const son = father.children[father.children.length - 1];
                        son.children = [...son.children, {
                            menuId: index,
                            order: order,
                            name: name,
                            children: []
                        }];
                }
            }
        });
        return m;
    }


    render() {
        const m = this.generateMenuList(this.props.menu);
        // const mockMenu = [
        //     {
        //         menuId: 1,
        //         name: '一级标题1',
        //         children: [
        //             {
        //                 menuId: 2,
        //                 name: '二级标题1',
        //                 children: [
        //                     {
        //                         menuId: 3,
        //                         name: '三级标题',
        //                         children: []
        //                     }
        //                 ]
        //             },
        //             {
        //                 menuId: 4,
        //                 name: '二级标题2',
        //                 children: []
        //             }
        //         ]
        //     },
        //     {
        //         menuId: 5,
        //         name: '一级标题2',
        //         children: []
        //     },
        //     {
        //         menuId: 6,
        //         name: '一级标题3',
        //         children: [
        //             {
        //                 menuId: 7,
        //                 name: '二级标题3',
        //                 children: []
        //             }
        //         ]
        //     }
        // ];

        return (
            <div>
                <ul className={'article-menu'}>
                    {
                        m.map((v) => (
                            this.renderMenu(v)
                        ))
                    }
                </ul>
            </div>
        );
    }
}

Menu.propTypes = {
    menu: PropTypes.array.isRequired,
};

export default Menu;