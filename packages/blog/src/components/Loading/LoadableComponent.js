import Loadable from 'react-loadable';
import Loading from './index';

export const LoadableComponent = (component) =>{
    return Loadable({
        loader: component,
        loading: Loading,
    });
};
