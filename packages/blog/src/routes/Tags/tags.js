import React from 'react';
import {Helmet} from "react-helmet";
import PropTypes from 'prop-types';

import Tag from '../../components/Tag';
import * as FontAwesome from 'react-icons/fa';

import 'highlight.js/styles/atom-one-dark.css';
import './assets/stylesheets/tags.scss';

class Tags extends React.PureComponent {

    tagClick(v) {
        this.props.history.push(`/tag/${v}`);
    }

    render() {
        const {tagList} = this.props;
        const banner = require('./assets/images/banner.jpg');
        return (
            <div className="tags-container">
                <Helmet title='学而录 | 标签'/>
                <div className='tags-banner' style={{
                    backgroundImage: `url(${banner})`,
                    backgroundPositionX: '50%',
                    backgroundPositionY: '50%',
                    backgroundSize: 'cover',
                    backgroundColor: 'rgb(17, 17, 17)',
                }}
                >
                    <div className='tags-banner-content'>
                        <div className='tags-banner-detail'>
                            <p className='tags-banner-type'>
                                苟日新，日日新，又日新
                            </p>
                        </div>
                    </div>
                </div>
                <div className='tags-list-container'>
                    <div className='tags-content'>
                        <h1><FontAwesome.FaTag/> 文章标签</h1>
                        {
                            tagList.map((v, index) => (
                                <Tag label={v.tagName} key={index} clickTag={() => this.tagClick(v.tagName)}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

Tags.propTypes = {
    tagList: PropTypes.array.isRequired,
};

export default Tags;
