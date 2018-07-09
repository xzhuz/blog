import React from 'react';
import Loadable from 'react-loadable';
import { getAchieveData } from './modules';
import Loading from '../../components/Loading';

export default Loadable.Map({
    loader: {
        Achieve: () => import('./index'),
        article: () => getAchieveData(),
    },
    loading: Loading,
    delay: 1000,
    render(loaded, props) {
        const Achieve = loaded.Achieve.default;
        const articles = loaded.article.get('ACHIEVE_DATA');
        return <Achieve {...props} articles={articles} />;
    }
});
