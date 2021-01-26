
import './App.css';

import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth'

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyAJfO7-gM9UjGSKnYtw4Ttw6TiHGhfHcRU",
    authDomain: "super-chat-lk.firebaseapp.com",
    databaseURL: "https://super-chat-lk-default-rtdb.firebaseio.com",
    projectId: "super-chat-lk",
    storageBucket: "super-chat-lk.appspot.com",
    messagingSenderId: "519267104030",
    appId: "1:519267104030:web:498b83baf0a01d3850850f",
    measurementId: "G-3EWV7TX82Z"
})

const auth = firebase.auth();
const firestore = firestore.firestore();

function App() {
  const [user] = userAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
      
      </header>

      <selection>

        { user ? <ChatRoom /> : <SignIn /> }
      
      </selection>
    </div>
  );
}

function SignIn(){
  const singInWithGoogle = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <button onClick = {singInWithGoogle} >Sign in with Google</button>
  )
}

function SignOut() {
  return  auth.currentUser && (
    <button onClick = {() => auth.signOut()}>Sign Out</button>
  )
}

function chatRoom() {

  const messageRef = firestore.collection('messages');
  const query = messageRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  return (
    <>  
      <div>
        { messages && messages.map(msg => <chatMessage key= {msg.id} />)}
      </div>
    </>
  )
}

export default App;
