// Contacts
// --------

import {getUser} from '../API'

async function getMeForSelectFriends() {
  var user = await getUser()
  return {
    selected: false,
    ...user
  }
};

const initialState_friends = {
  all: [{ username: 'ads', id: -1, selected: false }]
}

const friends = (state = initialState_friends, action) => {
  switch (action.type) {
    case 'addContact':
      console.log(state.all)
      return Object.assign({}, state, {
        all: [
          ...state.all,
          { username: action.username, id: action.id }
        ]
      })
      break;

    default:
      return state
  }
}


export default friends





// Moments
// -------

const initialState_moments = {
  all: []
}

const moments = (state = initialState_moments, action) => {
  switch (action.type) {
    default:
      return state
  }
}

