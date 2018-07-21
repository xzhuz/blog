import { LOCATION_CHANGE } from 'react-router-redux';

import { fromJS } from 'immutable';

// ------------------------------------
// Reducer
// ------------------------------------
// Initial routing state
const locationInitialState = fromJS({
  location: null
});

/**
 * Merge route into the global application state
 */
export default function locationReducer (state = locationInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload
      });
    default:
      return state;
  }
}
