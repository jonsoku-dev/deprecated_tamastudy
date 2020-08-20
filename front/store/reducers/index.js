import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import userReducer from './user.reducer';
import postReducer from './post.reducer';
import commentReducer from './comment.reducer';

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        userReducer,
        postReducer,
        commentReducer,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
