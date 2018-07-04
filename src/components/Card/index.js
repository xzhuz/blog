import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import * as FontAwesome from 'react-icons/lib/fa';

import Tag from '../Tag';
import './card.scss';

class Card extends React.PureComponent {
    constructor(props) {
        super(props);
        this.showPost = this.showPost.bind(this);
        this.state = {showCard: false};
    }

    showPost() {
        const {articleId} = this.props;
        this.props.showPost(articleId);
    }

    handleClickTag(v) {
        this.props.clickTag(v);
    }

    componentDidMount() {
        this.setState({showCard: true});
    }

    componentWillUnmount() {
        this.setState({showCard: false});
    }

    prefixInteger(num, n) {
        return (Array(n).join(0) + num).slice(-n);
    }

    formatDate(date) {
        const blogDate = new Date(date);
        const year = blogDate.getFullYear();
        const month = this.prefixInteger(blogDate.getMonth(), 2);
        const day = this.prefixInteger(blogDate.getDate(), 2);
        const hours = this.prefixInteger(blogDate.getHours(), 2);
        const minutes = this.prefixInteger(blogDate.getMinutes(), 2);
        const seconds = this.prefixInteger(blogDate.getSeconds(), 2);
        return year + '/' + month + '/' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    }

    render() {
        const {thumb, title, summary, tags, date, showCardInfo, compliment, visit} = this.props;
        return (
            <CSSTransition
                in={this.state.showCard}
                classNames="card"
                unmountOnExit
                timeout={{ enter: 500, exit: 300 }}
                onExited={() => {this.setState({showCard: false});}}
            >
                <div className='card'>
                    <div className='thumb' onClick={this.showPost}>
                        <img src={thumb} alt='picture'/>
                    </div>
                    <div className='card-container'>
                        <div className='card-title' onClick={this.showPost} >
                            <span>{title}</span>
                            <section className='card-info'>
                                <i><FontAwesome.FaCalendar/>{this.formatDate(date)}</i>
                                <i><FontAwesome.FaEye/>{visit}</i>
                                <i><FontAwesome.FaThumbsUp/>{compliment}</i>
                            </section>
                        </div>
                        <div className='card-content' onClick={this.showPost} >
                            <span>{summary}</span>
                        </div>
                        <div className='card-tags' style={{display: showCardInfo ? 'flex' : 'none'}}>
                            {
                                tags.split(',').sort().map((v, index) => (
                                    <Tag label={v} key={index} clickTag={(v) => this.handleClickTag(v)} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </CSSTransition>
        );
    }
}

Card.propTypes = {
    thumb: PropTypes.string,
    showPost: PropTypes.func,
    clickTag: PropTypes.func,
    articleId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    showCardInfo: PropTypes.bool.isRequired,
    visit: PropTypes.number.isRequired,
    compliment: PropTypes.number,
};

export default Card;