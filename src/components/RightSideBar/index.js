import React from 'react';
import PropTypes from 'prop-types';
import SideBar from "../SideBar";
import Tag from "../Tag";
import Card from "../Card";
import './rightSideBar.scss';

class RightSideBar extends React.PureComponent {

    tagClick(v) {
        const {onClickTag} = this.props;
        if (onClickTag) {
            onClickTag(v);
        }
    }

    render() {
        const {articles, tags} = this.props;
        return (
            <div className={'right-side-bar'}>
                <SideBar barTitle={'热门博客'}>
                    {
                        articles
                            ? articles.filter(v => v.publish).map((v, index) => (
                                <Card key={index} articleId={v._id} title={v.title} thumb={v.thumb}
                                      summary={''} tags={v.tags} date={v.date} clickTag={(v) => this.tagClick(v)}
                                      showPost={(id) => this.showPostContent(id)} showCardInfo={false}/>
                            ))
                            : ''
                    }
                </SideBar>
                <SideBar barTitle={'标签'}>
                    {
                        tags
                            ? tags.map((v, index) => (
                                <Tag label={v} key={index} clickTag={(v) => this.tagClick(v)}/>
                            )) :
                            ''
                    }
                </SideBar>
            </div>
        );
    }
}

RightSideBar.propTypes = {
    articles: PropTypes.array,
    tags: PropTypes.array,
    onClickTag: PropTypes.func,
};

export default RightSideBar;