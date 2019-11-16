import React from 'react';
import { combineReducers } from 'redux-immutable';
import locationReducer from './location';
import hoistNonReactStatics from 'hoist-non-react-statics';
import PropTypes from 'prop-types';
import getInjectors from './reducerInjectors';

export const createReducers = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    ...asyncReducers
  });
};

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */
export default ({key, reducer} = {}) => (WrappedComponent) => {
  class ReducerInjector extends React.Component {
    static WrappedComponent = WrappedComponent;
    static contextTypes = {
      store: PropTypes.object.isRequired
    };
    static displayName = `withReducer(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`;

    UNSAFE_componentWillMount () {
      const {injectReducer} = this.injectors;
      injectReducer(key, reducer);
    }

    injectors = getInjectors(this.context.store);

    render () {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};
