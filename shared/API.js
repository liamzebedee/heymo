import {
	AsyncStorage
} from 'react-native';

import { niceImage } from './_sampleData';






async function getAccessToken() {
	return await AsyncStorage.getItem('accessToken')
}

async function setUser({ username, password, id }) {
	AsyncStorage.setItem('user', JSON.stringify({ username, password, id }))
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
		userCredentials.id = user.id;
		await signInUser(userCredentials);
	} catch(err) {
		console.log(err)
		if(err.details.details.codes.username[0] === 'uniqueness') {
			throw new Error("Username already taken!");
		}
		throw err
	}
}

export async function signInUser({ username, password }) {
	try {
		var res = await apiPost('/users/login', { username, password }, true);
		setUser({ username, password, id: res.userId })
		setAccessToken(res.id)
	} catch(err) {
		console.log(err)
		if(err.details.code === "LOGIN_FAILED") {
			throw new Error("Login failed: wrong username/password?")
		}
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



export async function getHeymos(userId, sinceTime) {
    var user = await getUser()

	try {
		var api = await getAPI();
		
		var res = await api.Forward.Forward_getCurrentMos({
			userId,
			sinceTime
		});
		return res.obj.mos;

	} catch(err) {
		console.log(err);
	}
}


export async function sendMo({ contentImage, contentText, to }) {
	var todaysDate = new Date;
	var user = await getUser()

	var moment = {
		dateCreated: todaysDate,
		creatorUserId: user.id
	};
	if(contentImage) {
		moment.contentImage = contentImage;
	} else {
		moment.contentText = contentText;
	}

	// upload moment
	try {
		var res = await apiPost('/moments', moment);
		var newMomentId = res.id;
		var res = await forwardMo({ momentId: newMomentId, revealInterval: '0', to, isRemo: false })

	} catch(err) {
		console.log(err)
		throw err;
	}
}

export async function remo({ momentId, to }) {
	var res = await forwardMo({ momentId, to, revealInterval: '0', isRemo: true });
	return res;
}

export async function forwardMo({ momentId, revealInterval, to, isRemo }) {
	var user = await getUser()
	var forward = {
		dateCreated: new Date,
		dateReveal: new Date,
		isRemo: isRemo || false,
		revealInterval: revealInterval,

		momentId: momentId,
		fromUserId: user.id,
		toUserIds: to || []
	};

	var res = await apiPost('/forwards', forward );
}






// const SERVER_URL_BASE = "http://heymo1.onwikipedia.org:3000";
const SERVER_URL_BASE = "http://0.0.0.0:3000";
const SERVER_URL = SERVER_URL_BASE+"/api";



var _client;
async function loadAPIClient() {
	var Swagger = require('swagger-client');
	_client = await new Swagger({
		url: SERVER_URL_BASE+'/explorer/swagger.json',
		usePromise: true
	});

	// var a = new Swagger({
	// 	url: SERVER_URL_BASE+'/explorer/swagger.json',
	// 	usePromise: true
	// }).then(function(client) {
		
	// });
}

async function getAPI() {
	if(!_client) {
		await loadAPIClient();
	}
	return _client;
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
		console.log(`API call to ${method} ${url} with params ${JSON.stringify(params)}`);
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