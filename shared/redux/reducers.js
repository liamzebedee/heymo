// Contacts
// --------

import {AsyncStorage} from 'react-native'
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { loadFriends } from './actions';
import { persistStore, autoRehydrate } from 'redux-persist';



var withMiddleware = compose(autoRehydrate(), applyMiddleware(thunkMiddleware));

//
// Contacts
//
//
const initialState_friends = {
  all: []
}

const friends = (state = initialState_friends, action) => {
  switch (action.type) {
    case 'addContact':
      return Object.assign({}, state, {
        all: [
          ...state.all,
          { username: action.username, id: action.id }
        ]
      })
      break;

    case 'friendsLoaded':
      return Object.assign({}, state, {
        all: action.friends
      });
      break;

    default:
      return state
  }
}

const FriendStore = createStore(friends, initialState_friends, withMiddleware);
persistStore(FriendStore, {storage: AsyncStorage});




//
// Moments
// (actually they are forwards)
//
//
const initialState_moments = {
  all: [],
  loading: false
};


const moments = (state, action) => {
  switch (action.type) {
    case 'momentsLoaded':
      return Object.assign({}, state, {
        all: state.all.concat(action.moments),
        loading: false
      });
      break;

    default:
      return state
  }
  return state;
}

const MomentsStore = createStore(moments, initialState_moments, withMiddleware);
persistStore(MomentsStore, {storage: AsyncStorage}, function afterRehydrate() {
  var heymos = MomentsStore.getState().all;
  console.log("Loaded "+heymos.length+" moments from cache: "+heymos.map((heymo) => heymo.id).join(' '));
});












export {
  FriendStore,
  MomentsStore
};