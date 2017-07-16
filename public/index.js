var elements = {
	getUserButton: document.querySelector('#get-user'),
	deleteUserButton: document.querySelector('#delete-user'),
	getUsersButton: document.querySelector('#get-users'),
	userIdInput: document.querySelector('#user-id'),
	usersContainer: document.querySelector('#users-container'),

	getCollocutorsButton: document.querySelector('#get-collocutors'),

	getMessageButton: document.querySelector('#get-message'),
	deleteMessageButton: document.querySelector('#delete-messages'),
	getMessagesButton: document.querySelector('#get-messages'),
	messageIdInput: document.querySelector('#message'),
};

(function(){
	bindListeners();
})();

var currentUsers = [];
var currentMessage = [];

function bindListeners(){
	elements.getUsersButton.addEventListener('click', function(event){
		getUsers(null, function(err, users){
			renderUsers(users);
		});
	});

	elements.getMessagesButton.addEventListener('click', function(event){
		getMessagers(null, function(err, messages){
			renderMessages(messages);
		});
	});

	elements.getUserButton.addEventListener('click', function(event){
		var userId = Number(elements.userIdInput.value);
		if (!isNaN(userId)){
			getUsers(userId, function(err, users){
				renderUsers(users);
			});
		}
	});

	elements.getMessageButton.addEventListener('click', function(event){
		var senderId = Number(elements.messageIdInput.value);
		if (!isNaN(senderId)){
			getMessagers(senderId, function(err, messages){
				renderMessages(messages);
			});
		}
	});


	elements.deleteUserButton.addEventListener('click', function(event){
		var userId = Number(elements.userIdInput.value);
		if (!isNaN(userId)){
			deleteUser(userId, function(isSuccess){
				if (isSuccess){
					renderUsers
				}
			});
		}
	});

	elements.getCollocutorsButton.addEventListener('click', function(event){
		var userId = Number(elements.userIdInput.value);
		if (!isNaN(userId)){
			getCollocutors(userId, function(err, users){
				renderUsers(users);
			});
		}
	});
}

function renderUsers(users){
	if (!users){
		users = currentUsers;
	}
	elements.usersContainer.innerHTML = '';

	for (var i = 0; i < users.length; i++){
		var user = users[i];
		var userContainer = document.createElement('div');
		userContainer.className = 'user-container';

		var userId = document.createElement('div');
		userId.innerText = user.id;
		userContainer.appendChild(userId);

		var userName = document.createElement('div');
		userName.innerText = user.name;
		userName.className = 'user-name';
		userContainer.appendChild(userName);

		var userEmail = document.createElement('div');
		userEmail.innerText = user.email;
		userContainer.appendChild(userEmail);

		elements.usersContainer.appendChild(userContainer);
	}
}

function renderMessages(messages){
	if (!messages){
		messages = currentMessage;
	}
	
	elements.usersContainer.innerHTML = '';

	var userContainer = document.createElement('div');
	userContainer.className = 'user-container';

	var senderId = document.createElement('div');
	senderId.innerText = 'senderId';
	userContainer.appendChild(senderId);

	var receiverId = document.createElement('div');
	receiverId.innerText = 'receiverId';
	receiverId.className = 'user-name';
	userContainer.appendChild(receiverId);

	var messageText = document.createElement('div');
	messageText.innerText = 'Message';
	userContainer.appendChild(messageText);	

	elements.usersContainer.appendChild(userContainer);

	for (var i = 0; i < messages.length; i++){
		var message = messages[i];
		var userContainer = document.createElement('div');
		userContainer.className = 'user-container';

		var messageId = document.createElement('div');
		messageId.innerText = message.senderId;
		userContainer.appendChild(messageId);

		var messagesName = document.createElement('div');
		messagesName.innerText = message.receiverId;
		messagesName.className = 'user-name';
		userContainer.appendChild(messagesName);

		var messageText = document.createElement('div');
		messageText.innerText = message.text;
		userContainer.appendChild(messageText);

		elements.usersContainer.appendChild(userContainer);
	}
}

function deleteUser(id, callback){
	var connection = new XMLHttpRequest();
	connection.addEventListener('load', reqListener);
	connection.open('DELETE', '/api/user/' + id);
	connection.send();

	function reqListener(event){
		callback(this.status === 200);		
	}
}

function getUsers(id, callback){
	var idString = '';
	var isOneUser = false;
	if (id !== null){
		idString = '/' + id;
		isOneUser = true;
	}
	var connection = new XMLHttpRequest();
	connection.addEventListener('load', reqListener);
	connection.open('GET', '/api/user' + idString);
	connection.send();

	function reqListener(event){
		try {
			var resp = JSON.parse(this.responseText);
			if (isOneUser){
				resp = [resp];
			} else {
				currentUsers = resp;
			}
		} catch(e){
			return callback(new Error('error parsing response'));
		}
		callback(null, resp);
	}
}

function getMessagers(id, callback){
	var idString = '';
	var isOneMessage = false;
	if (id !== null){
		idString = '/' + id;
		isOneMessage = true;
	}
	var connection = new XMLHttpRequest();
	connection.addEventListener('load', reqListener);
	connection.open('GET', '/api/message' + idString);
	connection.send();

	function reqListener(event){
		/*try {
			var resp = JSON.parse(this.responseText);
			if (isOneMessage){
				resp = [resp];
			} else {
				currentMessage = resp;
			}
		} catch(e){
			return callback(new Error('error parsing response'));
		}*/
		var resp = JSON.parse(this.responseText);
		callback(null, resp);
	}
}

function getCollocutors(id, callback){
	var idString = '';
	var isOneUser = false;
	if (id !== null){
		idString = '/' + id + '/collocutors';
		isOneUser = true;
	}
	var connection = new XMLHttpRequest();
	connection.addEventListener('load', reqListener);
	connection.open('GET', '/api/user' + idString);
	connection.send();

	function reqListener(event){
		var resp = JSON.parse(this.responseText);
		callback(null, resp);
	}
}