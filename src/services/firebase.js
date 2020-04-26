import firebase from 'firebase'

firebase.initializeApp({
    apiKey: "AIzaSyDzclA_cs5KD89xvLdVGYxUBe_s9FomevM",
    authDomain: "fir-react-practice-240e6.firebaseapp.com",
    databaseURL: "https://fir-react-practice-240e6.firebaseio.com",
    projectId: "fir-react-practice-240e6",
    storageBucket: "fir-react-practice-240e6.appspot.com",
    messagingSenderId: "652616578586",
    appId: "1:652616578586:web:9bad7004b6506284b783a3",
    measurementId: "G-B8VBQJDWD6"
  })

  export const auth = firebase.auth;
  export const db = firebase.database();