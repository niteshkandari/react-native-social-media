// import firebase from "firebase/app";
// // import { initializeApp } from 'firebase/app';
// // import {...} from "firebase/auth";
// // import {...} from "firebase/database";
// // import {...} from "firebase/firestore";
// // import {...} from "firebase/functions";
// // import {...} from "firebase/storage";

// class Fire {
//   constructor() {
//     this.config = {
//     };
//     this.init();
//     this.checkAuth();
//   }

//   init = () => {
//     if (!firebase?.apps.length) {
//       firebase.initializeApp(this.config);
//     }
//   };
//   checkAuth = () => {
//     firebase?.auth().onAuthStateChanged((user) => {
//       if (!user) {
//         firebase.auth().signInAnonymously();
//       }
//     });
//   };
//   send = (messages) => {
//     messages.forEach((item) => {
//       const message = {
//         text: item.text,
//         timeStamp: firebase.database.ServerValue.TIMESTAMP,
//         user: item.user,
//       };
//       this.db.push(message);
//     });
//   };
//   parse = (message) => {
//     const { user, text, timestamp } = message.val();
//     const { key: _id } = message;
//     const createdAt = new Date(timestamp);
//     return {
//       _id,
//       createdAt,
//       text,
//       user,
//     };
//   };
//   get = (callback) => {
//     this.db.on("child_added", (snapshot) => callback(this.parse(snapshot)));
//   };
//   off() {
//     this.db.off();
//   }
//   get db() {
//     return firebase.database().ref("messages");
//   }
//   get uid() {
//     return (firebase.auth().currentUser || {}).uid;
//   }
// }

// export default new Fire();

import { initializeApp } from 'firebase/app';

const Fire = initializeApp({});

// Initialize Cloud Firestore and get a reference to the service
  // const db = getFirestore(Fire)
  export default Fire;