const convertChar = (char, mod=1) => {
	return String.fromCharCode(char.charCodeAt(0) + 2 * mod);
}
module.exports = {
	coder: (id)=>{
		return id.split('').map(char=>convertChar(char)).join('');
	},
	decoder: (id)=>{
		return id.split('').map(char=>convertChar(char, -1)).join('');
	}
}