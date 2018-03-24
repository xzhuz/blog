import React from 'react';
import PropTypes from 'prop-types';

class Menu extends React.PureComponent {

    renderMenu({menuId, name, children}) {
        return (
            <li key={menuId}>
                {name}
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

    generateMenuList(menu, level) {
        let m = [];
        level.forEach((v, index) => {
            // 一级标题
            m = [...m, {
                menuId: index,
                name: menu[index],
                children: []
            }];
            console.log(v);
        });
        console.log(m);
    }


    render() {
        const {menu} = this.props;
        const level = menu.map(v => {
            return v.lastIndexOf('#') - v.indexOf('#');
        });
        console.log(menu);
        console.log(level);
        const mockMenu = [
            {
                menuId: 1,
                name: '一级标题1',
                children: [
                    {
                        menuId: 2,
                        name: '二级标题1',
                        children: [
                            {
                                menuId: 3,
                                name: '三级标题',
                                children: []
                            }
                        ]
                    },
                    {
                        menuId: 4,
                        name: '二级标题2',
                        children: []
                    }
                ]
            },
            {
                menuId: 5,
                name: '一级标题2',
                children: []
            },
            {
                menuId: 6,
                name: '一级标题3',
                children: [
                    {
                        menuId: 7,
                        name: '二级标题3',
                        children: []
                    }
                ]
            }
        ];

        this.generateMenuList(menu, level);
        return (
            <div>
                <ul>
                    {
                        mockMenu.map((v) => (
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