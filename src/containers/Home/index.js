import React from 'react';
import Loadable from 'react-loadable';
import './home.scss';
import Loading from '../../components/Loading';

const LoadableComponent = Loadable({
    loader: () => import('./LoadableHome'),
    loading: Loading,
    delay: 200,
});

export default class Home extends React.Component {
    render () {
        return (
            <LoadableComponent/>
        );
    }
}

