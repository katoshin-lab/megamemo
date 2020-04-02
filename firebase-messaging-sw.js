/* eslint-disable no-undef */
importScripts ("https://www.gstatic.com/firebasejs/7.3.0/firebase-app.js");
importScripts ("https://www.gstatic.com/firebasejs/7.3.0/firebase-messaging.js");

firebase.initializeApp({
  'messagingSenderId' : '836383038964'
});

const messaging = firebase.messaging();

self.addEventListener('push', (event) => {
  console.log("push event")
  let messageTitle = "title";
  let messageBody = "body";
  const notificationPromise = self.registration.showNotification(
    messageTitle,
    messageBody
  );
  event.waitUntil(notificationPromise);
}, false);

messaging.setBackgroundMessageHandler(() => {
  console.log("backgroundMessage");
  let messageTitle = "title";
  let messageBody = "body";
  return self.registration.showNotification(
    messageTitle,
    messageBody
  );
});