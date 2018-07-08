import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import {List} from "immutable";
import SquareCard from "../SquareCard";
import './stylesheets/popularBar.scss';

class PopularArticlesBar extends React.PureComponent{

    constructor(props) {
        super(props);
        this.state = {
            showPopularArticlesBar: false,
        };
    }

    componentDidMount() {
        this.props.loadPopularArticles();
    }

    showPostContent(articleId) {
        this.props.history.push({
            pathname: `/article/${articleId}`
        });
    }

    componentDidUpdate() {
        this.setState({showPopularArticlesBar: true});
    }

    componentWillUnmount() {
        this.setState({showPopularArticlesBar: false});
    }


    render () {
        const {popularArticles} = this.props;
        return  <CSSTransition
            in={this.state.showPopularArticlesBar}
            classNames="right-side-bar"
            unmountOnExit
            timeout={{ enter: 500, exit: 300 }}
        >
            <div className='right-side-bar'>
                <div className='side-bar-name'>
                    <h1>热门文章</h1>
                </div>
                <div className='side-popular-articles'>
                    {
                        popularArticles.filter(v => v.publish).map((v) => (
                            <SquareCard key={`${v.date}-${v.title}`} title={v.title} date={v.date} id={v.id}
                                        compliment={v.compliment} summary={v.summary} thumb={v.thumb} visit={v.visit}
                                        showPostContent={() => this.showPostContent(v.id)}
                            />
                        ))
                    }
                </div>
            </div>
        </CSSTransition>;
    }
}

PopularArticlesBar.propTypes = {
    popularArticles: PropTypes.instanceOf(List),
    loadPopularArticles: PropTypes.func,
};

export default PopularArticlesBar;