import React from 'react';
import PropTypes from 'prop-types';

import Card from "../../../components/Card";
import './stylesheets/home.scss';

class Home extends React.Component {

    renderCards(v, index) {
        return <Card key={index} articleId={v.id} title={v.title} thumb={v.thumb} visit={v.visit}
                     summary={v.summary} tags={v.tags} date={v.date} clickTag={(v) => this.tagClick(v)}
                     showPost={(id) => this.showPostContent(id, v.visit)} showCardInfo={true}/>;
    }

    render() {
        const {articleQuantity, initArticles} = this.props;
        return (
            <div className='container'>
                <div className='articles'>
                    {
                        initArticles.filter(v => v.publish).map((v, index) => (
                            this.renderCards(v, index)
                        ))
                    }
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    initArticles: PropTypes.array,
    articleQuantity: PropTypes.number,
};

export default Home;
