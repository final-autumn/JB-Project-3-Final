/*_ = require('lodash.invert');
const secretString = 'thisstatementisfalse';
function charConvert(shaa) {
	if (Number(shaa)) {
		//console.log(shaa)
		//console.log(String.fromCharCode(Number(shaa) + 96))
		return String.fromCharCode(Number(shaa) + 96)
	}
	return shaa.charCodeAt(0) - 96;
}
const letters = {
    '0': 'z',
    '1': '/',
    '2': 't',
    '3': '3',
    '4': 'D',
    '5': '2',
    '6': ' ',
    '7': 'C',
    '8': '=',
    '9': 'a',
    '10': 'b',
	'11': 'Z',
    '12': 'T',
    '13': '1',
    '14': ';',
    '15': '5',
    '16': '+',
    '17': '6',
    '18': '~',
    '19': '.',
    '20': ',',
    '21': 'q',
    '22': 'B',
    '23': 'J',
    '24': '@',
    '25': '#',
    '26': '!',
    '27': '$',
    '28': '&',
	'30': 'r',
    '31': 'R',
    '32': 'W',
    '33': 'j',
    '34': 'p',
    '35': 'P',
    '36': 'l',
    '37': 'L',
    '38': 'A',
}
function changeTo(char, num) {
	return letters[charConvert(char) + Number(num) + ''];
}
const srettel = _(letters);
function changeBack(char, origichar) {
	return Math.abs(srettel[char] - charConvert(origichar));
}

module.exports = {
	coder: (id)=>{
		const strId = id
		return secretString.split('').map((secret) => charConvert(secret) + Number(id)).join(',')
	},
	decoder: (id)=>{
		return Number(id.split(',')[0]) - charConvert(secretString[0])
	}
}*/
//_ = require('lodash.invert');
const convertChar = (char, mod=1) => {
	return String.fromCharCode(char.charCodeAt(0) + 2 * mod);
}
module.exports = {
	coder: (id)=>{
		return id.split('').map(char=>convertChar(char)).join('');
	},
	decoder: (id)=>{
		console.log(id + '1111111');
		return id.split('').map(char=>convertChar(char, -1)).join('');
	}
}