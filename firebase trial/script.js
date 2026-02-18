// Import functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onChildAdded,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAp5WiQK35jvRPTRS7jYqvHGdJldfvrRHs",
  authDomain: "simple-chat-app-5a1b0.firebaseapp.com",
  projectId: "simple-chat-app-5a1b0",
  storageBucket: "simple-chat-app-5a1b0.firebasestorage.app",
  messagingSenderId: "207040537607",
  appId: "1:207040537607:web:1ae95281d2ad128900f6a2",
  databaseURL:
    "https://simple-chat-app-5a1b0-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Send message
window.sendMessage = function () {
  const username = document.getElementById("username").value;
  const message = document.getElementById("message").value;

  if (username === "" || message === "") return;

  push(ref(db, "messages"), {
    username: username,
    message: message,
    time: Date.now(),
  });

  document.getElementById("message").value = "";
};

// Listen for new messages
onChildAdded(ref(db, "messages"), (data) => {
  const chatBox = document.getElementById("chatBox");
  const msg = data.val();

  chatBox.innerHTML += `<p><b>${msg.username}</b>: ${msg.message}</p>`;
  chatBox.scrollTop = chatBox.scrollHeight;
});
