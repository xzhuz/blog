import React from 'react';
import { LoadableComponent } from '../../components/Loading/LoadableCompent';

export default LoadableComponent(() => import('./LoadableArchiveArticles'));
