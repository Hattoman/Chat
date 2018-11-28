/* eslint-disable no-unused-vars */
import style from '../css/style.css';
/* eslint-enable no-unused-vars */

// TODO: börja med att kolla Websocket under uppgifter och läs vilka meddelanden man kan pröva för att hämta å skicka data.
// lägg upp server med IP osv för att se att sidan svarar på händelser.

import password from './config';

const connection = new WebSocket('ws://104.248.143.87:1337');

connection.onopen = () => {
  console.log('Uppkoppling startad...');
};
connection.onmessage = message => {
  const obj = JSON.parse(message.data);
  console.log(obj);
  console.log(obj.data.text);
  // TODO: add if-sats to check which member is called before printing data type
  // TODO: console log each member of "data" (time, author, color etc) separated
};
// add event listener for Click to console log when someone presses SEND

const btnSend = document.getElementById('button');

btnSend.addEventListener('click', () => {
  const chatInput = document.getElementById('message');
  console.log(chatInput.value);

  const obj = {
    type: 'message',
    data: chatInput.value,
    key: password
  };
  const jsonObj = JSON.stringify(obj);
  connection.send(jsonObj);
});
// input.value hämtar det som står i TypeAMessage rutan
