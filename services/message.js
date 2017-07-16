/*Сущность сообщения содержит senderId и receiverId (id пользователей), а также тело сообщения.*/
const data = require('./data');

function findMessage(id){
	const err = null;
	if (typeof id === 'undefined'){
		err = new Error('id is undefined');
	}

	let index;
	const message = data.messages.find((el, ind) => {
		if (el.senderId === id){
			index = ind;
			return true;
		} else {
			return false;
		}
	});
	return {message, index, err};
}

module.exports = {
	findAll: (callback) => {
		console.log(data.messages);
		callback(null, data.messages);
	},

	findOne: (id, callback) => {
		const {err, message} = findMessage(id);
		console.log(message);
		callback(err, message);
	},

	add: (user, callback) => {
		if (typeof user.id !== 'undefined'){
			data.users.push(user);
			callback(null);
		} else {
			callback(new Error('user doesnt have id'));
		}
	},

	findOneAndDelete: (id, callback) => {
		let {err, message, index} = findMessage(id);
		if (typeof index !== 'undefined'){
			data.messages.splice(index, 1);
		} else {
			err = new Error('no users with such index');
		}
		callback(err);
	},

	findOneAndUpdate: (id, message, callback) => {
		const {err, index} = findMessage(id);
		data.messages[index] = Object.assign(data.messages[index], message);
		callback(err);
	}
};