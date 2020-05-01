import { auth, db } from '../services/firebase'

const users = []

export async function getUsers() {
  return db.ref('/users/').once('value').then(function(snapshot) {
    snapshot.forEach(function(item) {
      const itemVal = item.val()
      users.push(itemVal)
    })
    return users
    // console.log(users)
  })
}

export function signup(email, password) {
    auth().createUserWithEmailAndPassword(email, password)
}

export function signin(email, password) {
    return auth().signInWithEmailAndPassword(email, password)
}

export function signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    return auth().signInWithPopup(provider);
  }

  export function signInWithGitHub() {
    const provider = new auth.GithubAuthProvider();
    return auth().signInWithPopup(provider);
  }