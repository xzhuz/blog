import React from 'react';
import Loadable from 'react-loadable';
import Loading from '../../components/Loading';

const LoadableComponent = Loadable({
    loader: () => import('./LoadableArchiveArticles'),
    loading: Loading,
});

export default class ArchiveArticles extends React.Component {
    render () {
        return (
            <LoadableComponent/>
        );
    }
}

