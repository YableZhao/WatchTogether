document.addEventListener('DOMContentLoaded', function() {
  const createRoomBtn = document.getElementById('createRoom');
  const joinRoomBtn = document.getElementById('joinRoom');
  const roomIdInput = document.getElementById('roomId');
  const statusDiv = document.getElementById('status');

  // Firebase configuration (you'll need to replace with your own Firebase config)
  const firebaseConfig = {
    apiKey: "AIzaSyCuF7e-s97IOKrrJJWdjszLr-8h-U9KqSE",
  authDomain: "watchtogether-217ad.firebaseapp.com",
  projectId: "watchtogether-217ad",
  storageBucket: "watchtogether-217ad.firebasestorage.app",
  messagingSenderId: "955216907506",
  appId: "1:955216907506:web:b3df06bc45cfaf79a4546b",
  measurementId: "G-19SP8L3VMG"
  };

  // Initialize Firebase (this will be added later)
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();

  createRoomBtn.addEventListener('click', function() {
    const roomId = generateRoomId();
    roomIdInput.value = roomId;
    createRoom(roomId);
  });

  joinRoomBtn.addEventListener('click', function() {
    const roomId = roomIdInput.value.trim();
    if (roomId) {
      joinRoom(roomId);
    } else {
      showStatus('Please enter a Room ID', 'error');
    }
  });

  function generateRoomId() {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }

  function createRoom(roomId) {
    const roomRef = database.ref('rooms/' + roomId);
    roomRef.set({
      createdAt: firebase.database.ServerValue.TIMESTAMP
    }).then(() => {
      showStatus(`Room ${roomId} created successfully!`, 'success');
      // Send room ID to content script
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'roomCreated',
          roomId: roomId
        });
      });
    }).catch((error) => {
      showStatus('Error creating room: ' + error.message, 'error');
    });
  }

  function joinRoom(roomId) {
    const roomRef = database.ref('rooms/' + roomId);
    roomRef.once('value').then((snapshot) => {
      if (snapshot.exists()) {
        showStatus(`Joined room ${roomId}`, 'success');
        // Send room ID to content script
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: 'roomJoined',
            roomId: roomId
          });
        });
      } else {
        showStatus('Room does not exist', 'error');
      }
    }).catch((error) => {
      showStatus('Error joining room: ' + error.message, 'error');
    });
  }

  function showStatus(message, type) {
    statusDiv.textContent = message;
    statusDiv.style.color = type === 'error' ? 'red' : 'green';
  }
});
