import {
	AsyncStorage
} from 'react-native';

import { niceImage } from './_sampleData';

class HeymoError {
	constructor(errorObj) {
		this.details = errorObj
		this.message = errorObj.message
	}
}


function debug_log(obj) {
	console.log(JSON.stringify(obj))
}


async function getUser() {
	var user = JSON.parse(await AsyncStorage.getItem('user'));
	return user;
}

export async function loginOrCreateUser({ username, password }) {
	try {
		var user = await apiPost('/users', { username, password }, true)
	} catch(err) {
		alert(err.message)
	}
}

// export async function createUser({ username, password }) {
// 	try {
// 		let response = await apiPost('/users', { username, password }, true)
// 		var data = await response.json();
		
// 		if(data.error) {
// 			alert(data.error.message)
// 		} else {
// 			AsyncStorage.setItem('user', JSON.stringify({ username, password, id: data.id }))
// 		}
// 	} catch(err) {
// 		throw err;
// 	}
// }

// async function loginUser({username, password}) {
// 	try {
// 		let res = await apiPost('/users/login', { username, password }, true);
// 		let data = await res.json();
// 		if(data.id) {
// 			return data.id;
// 		}
// 	} catch(err) {
// 		throw err;
// 	}
// }

async function addFriend(username) {
	try {
		let res = await apiGet(`/users/`, { "where": { "username": username }})
		var data = await response.json();
		if(!data.error) {
			var contact = { username, id: data.id };
			_addFriendInBackground(contact)
			return contact
		}
	} catch(err) {
		throw new Error(err);
	}
}

async function _addFriendInBackground(contact) {
	var ourId = await getUser().id
	apiPost(`/users/${ourId}/contacts/rel/${contact.id}`)
}



function getHeymos() {
	// var res = await apiGet('/moments/getCurrentMos')
	return [
		{ opened: true, locked: false, id: 123123213, contentImage: {
			data: niceImage,
			height: 300,
			width: 300
			}, 
		},
        { opened: false, locked: false, id: "213d2131233", contentText: 'hey hey' },
        { opened: false, locked: true, id: "63452343423", contentText: 'Love is a funny thing....' },
    ];
}


async function getFriends() {
	/*
var res = await apiGet('/users/me/contacts')
	let data = await res.json()
	return data.map((friend) => {
		return { ...friend, selected: false }
	})
	*/
	return await AsyncStorage.getItem('friends') || [];
}

function getMeForSelectFriends() {
	return {
		username: "Me",
		selected: false,
		id: 123213123,
	}
}

function sendMo({ sentTo: [], moment }) {

}

function forwardMo({ sendToArray: [] }) {

}

function reMo() {

}






async function getAccessToken() {
	var token = null;//await AsyncStorage.getItem('accessToken')
	if(!token) {
		let user = await getUser()
		var token = await loginUser({ username: user.username, password: user.password })
		if(!token) {
			throw new Error("Can't get token")
		} else {
			let err = await AsyncStorage.setItem('accessToken', token);
			if(err) alert(err);
			return token;
		}
	}
}


const SERVER_URL = "http://0.0.0.0:3000/api";

async function api({ endpoint, params, noAuth, method }) {
	var headers =  {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json'
  	};

    if(!noAuth) {
    	var token = await getAccessToken()
        headers['Authorization'] = token
    }

	try {
		var res = await fetch(SERVER_URL + endpoint, {
	      method: method,
	      headers,
	      body: JSON.stringify(params)
	    })
		var data = await res.json();
		
		if(data.error) {
			throw new HeymoError(data.error)
		} else {
			return data;
		}
	} catch(err) {
		throw err;
	}
}

async function apiGet(endpoint, params, noAuth) {
	return api(endpoint, params, noAuth, 'GET')
}

async function apiPost(endpoint, data, noAuth) {
	return api({ endpoint, params: data, noAuth, method: 'POST' })
}

export { getHeymos, getFriends, getMeForSelectFriends, sendMo, forwardMo, reMo, addFriend, getUser, getAccessToken, loginOrCreateUser }