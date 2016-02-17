function getHeymos() {
	return [ { opened: false, locked: false, heymoId: "12312312312" },
        { opened: true, locked: false, heymoId: "213d2131233" },
        { opened: false, locked: true, heymoId: "63452343423" },
        { opened: false, locked: true, heymoId: "63452343423" } ];
}

function getFriends() {
	return [
        { name: "Aymeric", selected: false, id: 0 },
        { name: "Anna", selected: false, id: 1 },
        { name: "Chris", selected: false, id: 2 }
    ];
}

function sendMo({ sendToArray: [], moment }) {

}

function forwardMo({ sendToArray: [] }) {

}

function heartMo() {

}

function reMo() {

}

export { getHeymos, getFriends, sendMo, forwardMo, heartMo, reMo }