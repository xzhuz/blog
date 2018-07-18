import React from 'react';
import { LoadableComponent } from '../../components/Loading/LoadableComponent';

export default LoadableComponent(() => import('./index'));
