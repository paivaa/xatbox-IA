const API_KEY = "AIzaSyAX8AKi_-MZGvYZrCyVV6Z1k7AxSAG8FLA";
const chatWindow = document.querySelector('.chat-window');
const chatWindowMessage = document.querySelector('.chat-window-message');
const chatThread = document.querySelector('.chat-thread');
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${API_KEY}`

// On form submit, send message
chatWindow.onsubmit = function (e) {
	e.preventDefault();

	sendData();

	return false;
};


function sendData () {
    console.log(chatWindowMessage.value)

    const data = {
        "contents": [
          {
            "parts": [
              {
                 "text": "Responda com o texto devidamente formatado, colocando espaçamentos e quebras de linha em paragrafos como tags HTML. Não utilize a tag li ou UL ou OL. Responda o comando a seguir: "+chatWindowMessage.value
              }
            ]
          }
        ]
      };

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };

    let chatNewThread = document.createElement('li');
    	chatNewMessage = document.createTextNode(chatWindowMessage.value);

    // Add message to chat thread and scroll to bottom
    chatNewThread.appendChild(chatNewMessage);
    chatThread.appendChild(chatNewThread);
    chatThread.scrollTop = chatThread.scrollHeight;
    chatWindowMessage.value = '';

    chatNewThread = document.createElement('li');
    chatNewThread.id = "loading";
    chatNewMessage = document.createTextNode("...");
    chatNewThread.appendChild(chatNewMessage);
    chatThread.appendChild(chatNewThread);
    chatThread.scrollTop = chatThread.scrollHeight;

       fetch(url, options)
      .then(data => data.json())
      .then( handleMessage)
      .catch((e) => console.log(e));
}

function handleMessage (dados) {
    let chatNewThread = document.createElement('li');
        chatNewThread.innerHTML = dados.candidates[0].content.parts[0].text;
    	// chatNewMessage = document.createTextNode(dados.candidates[0].content.parts[0].text);

    // Add message to chat thread and scroll to bottom
    // chatNewThread.appendChild(chatNewMessage);
    chatThread.appendChild(chatNewThread);
    chatThread.scrollTop = chatThread.scrollHeight;

    // Clear text value
    chatWindowMessage.value = '';
    document.querySelector("#loading").remove();
}