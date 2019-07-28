import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import {dateFormat} from "../../utils/commentUtils";
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

    render() {
        const {thumb, title, introduce, tagList, createTime, showCardInfo, compliment, visit} = this.props;
        return (
            <CSSTransition
                in={this.state.showCard}
                classNames="card"
                unmountOnExit
                timeout={{ enter: 500, exit: 300 }}
                onExited={() => {this.setState({showCard: false});}}
            >
                <div className='post-card'>
                    <div className="post-card-image-link" onClick={this.showPost}>
                        <div className="post-card-image" style={{backgroundImage: `url(${thumb})`}}>
                        </div>
                    </div>

                    <div className="post-card-content">
                        <div className="post-card-content-link" onClick={this.showPost}>
                            <header className="post-card-header">
                                <h2 className="post-card-title">{title}</h2>
                            </header>
                            <section className="post-card-excerpt">
                                <p>{introduce}</p>
                            </section>
                        </div>
                        <div className="post-card-meta">

                            <ul className="tag-list">
                                {
                                    (tagList ? tagList : []).map((v, index) => (
                                        <li className="author-list-item" key={index} >
                                            <Tag label={v} clickTag={(v) => this.handleClickTag(v)} />
                                        </li>
                                    ))
                                }
                            </ul>

                            <span className="reading-time">{dateFormat(createTime)}</span>
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
    introduce: PropTypes.string.isRequired,
    tagList: PropTypes.array.isRequired,
    createTime: PropTypes.number.isRequired,
    showCardInfo: PropTypes.bool.isRequired,
    visit: PropTypes.number.isRequired,
    compliment: PropTypes.number,
};

export default Card;
