
/**
* @description Convert first character of each word in a string to uppercase
*/
export const camelize = function(str) {
	return str.split(' ').map(function(word){
		return word.charAt(0).toUpperCase() + word.slice(1);
	}).join('');
};