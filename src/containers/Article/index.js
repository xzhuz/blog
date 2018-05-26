import React from 'react';
import Loadable from 'react-loadable';
import Loading from '../../components/Loading';

const LoadableComponent = Loadable({
    loader: () => import('./LoadableArticle'),
    loading: Loading,
});

export default class Article extends React.Component {
    render () {
        return (
            <LoadableComponent/>
        );
    }
}
