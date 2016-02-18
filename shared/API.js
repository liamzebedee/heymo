class Heymo {
	// momentId: '13123123',
	// 		timeAgo: '2d',
	// 		from: 'Aymeric',
	// 		peopleTagged: "Aymeric, Anna, Moeuf, Liam, Rumy",
	// 		numReheys: 5,
	// 		numHearts: 4,
	// 		numForwards: 12,
	// 		contentImage: "data:image/jpeg;base64," + niceImage,
}

function createAndSetUser(username, password) {
	
}

function getUser() {
	return {
		username: 'liam',
		password: '123456'
	}
}


function getHeymos() {
	return [
		{ opened: false, locked: false, id: "12312312312" },
        { opened: true, locked: false, id: "213d2131233" },
        { opened: false, locked: true, id: "63452343423" },
    ];
}

function getFriends() {
	return [
        { name: "Aymeric", selected: false, id: 0 },
        { name: "Anna", selected: false, id: 1 },
        { name: "Chris", selected: false, id: 2 }
    ];
}

function getMeForSelectFriends() {
	return {
		name: "Me",
		selected: false,
		id: 123213123,
	}
}

function sendMo({ sendToArray: [], moment }) {

}

function forwardMo({ sendToArray: [] }) {

}

function heartMo() {

}

function reMo() {

}

function addFriend(username) {

}

export { getHeymos, getFriends, getMeForSelectFriends, sendMo, forwardMo, heartMo, reMo, addFriend, getUser }