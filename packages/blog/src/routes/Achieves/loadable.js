import React from 'react';
import Loadable from 'react-loadable';
import { getAchieveData } from './modules';
import Loading from '../../components/Loading';

import * as Achieve from './constants';

export default Loadable.Map({
    loader: {
        Achieve: () => import('./index'),
        achieveData: () => getAchieveData(),
    },
    loading: Loading,
    delay: 1000,
    render(loaded, props) {
        const Achieve = loaded.Achieve.default;
        const achieves = loaded.achieveData.get('ACHIEVE_DATA');
        return <Achieve {...props} achieves={achieves} />;
    }
});
