// Contacts
// --------
import {getUser} from '../API';

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
		getMeForSelectFriends().then(function(res) {
			dispatch(friendsLoaded([res]));
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