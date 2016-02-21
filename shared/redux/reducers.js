import {getMeForSelectFriends} from '../API'

const initialState = {
  all: [getMeForSelectFriends()]
}

const friends = (state = initialState, action) => {
  switch (action.type) {
    case 'addContact':
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