(function init() {
    let socket = io.connect("http://127.0.0.1:3000")
    let username = document.querySelector('#username');
    let saveUsername = document.querySelector('#saveUsername');
    let isUsername = document.querySelector('.card-header');
    saveUsername.addEventListener('click', e => {
        if(username.value.length <= 0) {
            return;
        }
        socket.emit('change_username', { username: username.value })
        isUsername.textContent = ' Welcome : '+username.value 
        username.value = ''
        document.getElementById("box-name").style.display = 'none';
        document.getElementById("box-sent-mg").style.display = 'block';
    }) 

    let message = document.querySelector('#message');
    let messageBtn = document.querySelector('#messageBtn');
    let messageList = document.querySelector('#message-list');

    messageBtn.addEventListener('click', e => {
       
        socket.emit('new_message', { message: message.value})
        message.value = ''
    })

    socket.on('receive_message', data => {
        
        let listItem = document.createElement('li')
        listItem.textContent = data.username + ": " + data.message;
        listItem.classList.add('list-group-item');
        messageList.appendChild(listItem) 
    })

    let info = document.querySelector('.info');

    message.addEventListener('keypress', e => {
        socket.emit('typing')
    })

    socket.on('typing', data => {
        info.textContent = data.username + " is typing..."
        setTimeout(() => { info.textContent = ''}, 5000)
    })
})();
