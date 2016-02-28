// Contacts
// --------

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { loadFriends } from './actions';



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
      console.log(action.friends);
      return Object.assign({}, state, {
        all: action.friends
      });
      break;

    default:
      return state
  }
}

FriendStore = createStore(friends, applyMiddleware(thunkMiddleware));

FriendStore.dispatch(loadFriends())

export { friends, FriendStore };