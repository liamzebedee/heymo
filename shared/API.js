import {
	AsyncStorage
} from 'react-native';

import { niceImage } from './_sampleData';






async function getAccessToken() {
	return await AsyncStorage.getItem('accessToken')
}

async function setUser({ username, id }) {
	AsyncStorage.setItem('user', JSON.stringify({ username, id }))
}
async function setAccessToken(token) {
	AsyncStorage.setItem('accessToken', token)
}

export async function getUser() {
	var user = JSON.parse(await AsyncStorage.getItem('user'));

	return user;
}

export function logout() {
	AsyncStorage.setItem('user', 'null')
	AsyncStorage.setItem('accessToken', 'null')
}


export async function joinUser({ username, password }) {
	try {
		var userCredentials = { username, password }
		var user = await apiPost('/users', userCredentials, true);
		userCredentials.id = user.id
		await signInUser(userCredentials)
	} catch(err) {
		console.log(err)
		throw err
	}
}

export async function signInUser({ username, password, id }) {
	try {
		setUser({ username, password, id })

		var response = await apiPost('/users/login', { username, password }, true);
		setAccessToken(response.id)
	} catch(err) {
		console.log(err)
		throw err
	}
}

async function renewToken() {
	await signInUser(await getUser());
}

export async function getUserId(username) {
	try {
		var data = await apiGet("/users/findOne", { "where": { "username": username } })
	} catch(err) {
		if(err.details.code === 'MODEL_NOT_FOUND') {
			throw new Error("No-one was found for that username!")
		}
		throw err;
	}
	return data.id
}



export async function getHeymos() {
	var testData = [
		{ opened: true, locked: false, id: 123123213, contentImage: {
			data: niceImage,
			height: 300,
			width: 300
			}, 
		},
        { opened: false, locked: false, id: "213d2131233", contentText: 'hey hey' },
        { opened: false, locked: true, id: "63452343423", contentText: 'Love is a funny thing....' },
    ];
    testData = [];


	try {
		var data = await apiGet('/moments/getCurrentMos', {"include":"creatorUser"})
		return data.mos.concat(testData)
	} catch(err) {
		alert(err.message)
	}
}


export async function sendMo({ momentText, momentImage, to }) {
	var todaysDate = new Date;

	var moment = {};
	if(momentImage) {
		moment.contentImage = momentImage;
	} else {
		moment.contentText = momentText;
	}
	moment.dateCreated = todaysDate;

	// upload moment
	try {
		var res = await apiPost('/moments', moment);
		var newMomentId = res.id;


	} catch(err) {
		console.log(err)
		throw err;
	}


}

// 

export function remo({ momentId, to }) {

}

export function forwardMo({ momentId, revealInterval, to }) {

		// // upload forward
		// var forward = {
		//   dateCreated: todaysDate,
		//   dateOfForward: todaysDate,
		//   dateReveal: todaysDate,
		//   revealInterval: "1 day",
		//   isRemo: false,
		//   momentId: newMomentId
		// };

		// var res = await apiPost('/fowards/createWithTo', { data: forward, relations: { to: to } });

}






// const SERVER_URL_BASE = "http://onwikipedia.org";
const SERVER_URL_BASE = "http://0.0.0.0:3000";
const SERVER_URL = SERVER_URL_BASE+"/api";

var Swagger = require('swagger-client');

async function loadAPIClient() {
	var client = new Swagger({
		url: SERVER_URL_BASE+'/explorer/swagger.json',
		success: function() {
			console.log(client);
		}
	});
}


class HeymoError {
	constructor(errorObj) {
		this.details = errorObj
		this.message = errorObj.message
	}
}

function debug_log(obj) {
	console.log(JSON.stringify(obj))
}

async function api({ endpoint, params, noAuth, method }) {
	var headers = {
	    'Accept': 'application/json',
  	};

    if(!noAuth) {
    	headers['Authorization'] = await getAccessToken();
    }

	var opts = {
	    method: method,
	    headers,
    }

    var url;

    if(method === 'GET') {
    	url = SERVER_URL + endpoint
    	if(params) {
    		url += '?filter=' + encodeURIComponent(JSON.stringify(params))
    	}
    } else {
    	url = SERVER_URL + endpoint
    	headers['Content-Type'] = 'application/json'
	    opts.body = JSON.stringify(params)
    }

	try {
		var res = await fetch(url, opts)
		var data = await res.json();
		
		if(data.error) {
			if(data.error.code === "AUTHORIZATION_REQUIRED") {
				await renewToken()
				api({ endpoint, params, noAuth, method })
			}

			throw new HeymoError(data.error)
		} else {
			return data;
		}
	} catch(err) {
		console.log("Error invoking endpoint "+endpoint)
		console.log(err)
		throw err;
	}
}

async function apiGet(endpoint, params, noAuth) {
	return api({ endpoint, params, noAuth, method: 'GET' })
}

async function apiPost(endpoint, params, noAuth) {
	return api({ endpoint, params, noAuth, method: 'POST' })
}