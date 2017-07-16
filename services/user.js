const data = require('./data');

function findUser(id){
	const err = null;
	if (typeof id === 'undefined'){
		err = new Error('id is undefined');
	}

	let index;
	const user = data.users.find((el, ind) => {
		if (el.id === id){
			index = ind;
			return true;
		} else {
			return false;
		}
	});
	return {user, index, err};
}

module.exports = {
	findAll: (callback) => {
		callback(null, data.users);
	},

	findOne: (id, callback) => {
		const {err, user} = findUser(id);
		callback(err, user);
	},

	// написать метод в сервисе, который будет сопоставлять сендерИД с ИД текущего юзера чтобы найти все его сообщения
	// затем по найденным сообщениям взять ресейверИД и сопоставить с ИД остальных юзеров. Найденные юзеры будут собеседниками текущего.
	getAllCollocutors: (id, callback) => {
		let collocutors = [];
		for (var i = 0; i < data.messages.length; i++) {
			if (id == data.messages[i].senderId) {
				for (var j = 0; j < data.users.length; j++) {
					if (data.messages[i].receiverId == data.users[j].id) {
						collocutors.push(data.users[j]);
					}
				}
			}
		}
		console.log(collocutors);
		callback(null, collocutors);
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
		let {err, user, index} = findUser(id);
		if (typeof index !== 'undefined'){
			data.users.splice(index, 1);
		} else {
			err = new Error('no users with such index');
		}
		callback(err);
	},

	findOneAndUpdate: (id, user, callback) => {
		const {err, index} = findUser(id);
		data.users[index] = Object.assign(data.users[index], user);
		callback(err);
	}
};