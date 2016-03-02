//
// Contacts
//
//
import {getUser, getHeymos} from '../API';

async function getMeForSelectFriends() {
  var user = await getUser();
  return {
    selected: false,
    me: true,
    ...user
  }
};

export function loadFriends() {
	return (dispatch) => {
		return getMeForSelectFriends().then(function(res) {
			return dispatch(friendsLoaded([res]));
		})
	}
}

export const friendsLoaded = (friends) => {
	return {
		type: 'friendsLoaded',
		friends
	}
}

export const addContact = (username, id) => {
  return {
    type: 'addContact',
    username: username,
    id: id,
  }
}



//
// Moments
// (actually they are forwards)
//
//
export function loadMoments() {
  return (dispatch) => {
    getHeymos().then((heymos) => {
      dispatch(momentsLoaded(heymos));
    })
  }
}

export const momentsLoaded = (moments) => {
  return {
    type: 'momentsLoaded',
    moments
  }
}

