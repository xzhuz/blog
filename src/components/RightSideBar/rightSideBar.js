import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import {List} from "immutable";
import tocbot from 'tocbot';
import classNames from 'classnames';

import {tocOption} from '../../utils/tocbotUtils';

import SideBar from '../SideBar';
import Card from '../Card';
import 'tocbot/dist/tocbot.css';
import './stylesheets/rightSideBar.scss';
import './stylesheets/toc.scss';

class RightSideBar extends React.PureComponent{

    constructor(props) {
        super(props);
        this.handleTocScroll = this.handleTocScroll.bind(this);
        this.state = {
            showRightSideBar: false,
            tocFixed: false,
        };
        this.barTitle = React.createRef();
    }

    componentDidMount() {
        this.setState({showRightSideBar: true});
        this.props.loadRelativeArticles(this.props.tag);
        window.addEventListener('scroll', this.handleTocScroll, false);
    }

    barTitleHeight = 0;

    handleTocScroll() {
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

        if (this.barTitle.current) {
            this.barTitleHeight = this.barTitle.current.offsetHeight;
        }
        const fixedHeight = this.barTitleHeight + 20;
        if (this.barTitleHeight > 0 && scrollTop > fixedHeight) {
            this.setState({tocFixed: true});
        } else if(this.state.tocFixed) {
            this.setState({tocFixed: false});
        }
    }

    showPostContent(articleId) {
       this.props.showPostContent(articleId);
    }

    componentWillUnmount() {
        tocbot.destroy();
        window.removeEventListener('scroll', this.handleTocScroll, false);
    }

    render () {
        const {relativeArticles, id} = this.props;
        const path = this.props.history.location.pathname;
        if (path.includes('/article')) {
            tocbot.init(tocOption());
        }
        return  <CSSTransition
            in={this.state.showRightSideBar}
            classNames="right-side-bar"
            unmountOnExit
            timeout={{ enter: 500, exit: 300 }}
        >
            <div className='right-side-bar'>
                {
                    <SideBar barTitle={'相关文章'} sideBarRef={this.barTitle}>
                        {
                            relativeArticles.filter(v => v.publish).filter(v => id !== '' || v.id === id).map((v, index) => (
                                <Card key={index} articleId={v.id} title={v.title} thumb={v.thumb} visit={v.visit}
                                      summary={''} tags={v.tags} date={v.date} clickTag={(v) => this.tagClick(v)}
                                      showPost={(id) => this.showPostContent(id, v.tags)} showCardInfo={false}/>
                            ))
                        }
                    </SideBar>
                }
                <div className={classNames('bar-toc', {
                    [`toc-fixed`]: this.state.tocFixed,
                })}>
                </div>
            </div>
        </CSSTransition>;
    }
}

RightSideBar.propTypes = {
    relativeArticles: PropTypes.instanceOf(List),
    loadRelativeArticles: PropTypes.func.isRequired,
    showPostContent: PropTypes.func.isRequired,
    tag: PropTypes.string.isRequired,
    id: PropTypes.string,
};

export default RightSideBar;