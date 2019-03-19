import React from 'react';
import * as FontAwesome from 'react-icons/fa';

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
                                    <a className='contract-icon' href='https://www.zhihu.com/people/mei-sen-41-34/activities'
                                       target='_blank'><FontAwesome.FaZhihu/></a>
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