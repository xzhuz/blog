import React from 'react';
import * as FontAwesome from 'react-icons/lib/fa';

import BasicLayout from "../BasicLayout";

import './notfound.scss';

class NotFound extends React.PureComponent{

    render() {
        return (
            <BasicLayout>
                <div className='not-found'>
                    <div className='oops'>😱 { "Oooops!" }</div>
                    <div>
                        <p className='title'>
                            { '你来到了没有知识的荒原...'}
                        </p>

                        <div className='contract'>
                            <ul>
                                <li>
                                    <a className='contract-icon' href='https://github.com/xebcxc' target='_blank'>
                                        <FontAwesome.FaGithub/></a>
                                </li>
                                <li>
                                    <a className='contract-icon' href='https://weibo.com/u/3002849234?refer_flag=1001030101_'
                                       target='_blank'><FontAwesome.FaWeibo/></a>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            </BasicLayout>
        );
    }
}

export default NotFound;