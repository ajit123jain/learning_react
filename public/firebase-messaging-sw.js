// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');


var firebaseConfig = {
  apiKey: "AIzaSyBx85RgcoUd6n9mTHF7KLdNlV-zXt2fXYI",
  authDomain: "candy-a52f7.firebaseapp.com",
  projectId: "candy-a52f7",
  storageBucket: "candy-a52f7.appspot.com",
  messagingSenderId: "631224808889",
  appId: "1:631224808889:web:84578f00adf10d11cab268"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});