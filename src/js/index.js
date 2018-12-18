/* eslint-disable no-unused-vars */
import style from '../css/style.css';
/* eslint-enable no-unused-vars */

import password from './config';

const connection = new WebSocket('ws://104.248.143.87:1337');

connection.onopen = () => {
  console.log('Uppkoppling startad...');
};
connection.onmessage = message => {
  const obj = JSON.parse(message.data);
  console.log(obj);
  const input = document.getElementById('message');

  if (obj.type == 'history') {
    console.log(obj.data);
    const history = obj.data;

    // loop through each message using a FOR loop then print them out in chatbox
    history.forEach(obj => {
      console.log(obj);

      const chatMsg = obj.text.toString();
      const time = new Date(obj.time).toString();
      const username = obj.author;
      const userColor = obj.color;

      const container = document.getElementById('scroll');
      const template = document.getElementById('hide');
      const div = document.importNode(template.content.firstElementChild, true);
      div.style = `background-color: ${userColor}`; // to use variables inside a string use dollarsign and bracket around it
      div.textContent = `${time.substr(16, 5) + username}:${chatMsg}`;
      container.appendChild(div);
    });
  }

  if (obj.type == 'color') {
    const username = input.value;

    const container = document.getElementById('username');
    container.textContent = username;
  }
  input.value = ' ';

  if (obj.type == 'message') {
    const chatMsg = obj.data.text;
    const time = new Date(obj.data.time).toString(); // set real-time numbers
    const username = obj.data.author;
    const userColor = obj.data.color; // extact color ID from console to apply to user messages

    const container = document.getElementById('scroll');
    const template = document.getElementById('hide');
    const div = document.importNode(template.content.firstElementChild, true);
    div.style = `background-color: ${userColor}`; // to use variables inside a string use dollarsign and bracket around it
    div.textContent = `${time.substr(16, 5) + username}:${chatMsg}`;
    container.appendChild(div);
  }
};

const btnSend = document.getElementById('button');
const eventHandler = () => {
  const chatInput = document.getElementById('message');
  console.log(chatInput.value); // input.value hämtar det som står i TypeAMessage rutan, alltså det man skrivit i boxen

  const obj = {
    type: 'message',
    data: chatInput.value,
    key: password
  };
  const jsonObj = JSON.stringify(obj);
  connection.send(jsonObj);
};
btnSend.addEventListener('click', eventHandler);
window.addEventListener('keypress', event => {
  if (event.code == 'Enter') {
    eventHandler();
  }
  console.log(event.code);
});
