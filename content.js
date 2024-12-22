// Content script to handle video synchronization
(function() {
  let currentRoom = null;

  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'roomCreated' || message.action === 'roomJoined') {
      currentRoom = message.roomId;
      setupVideoSync();
    }
  });

  function setupVideoSync() {
    const videos = document.getElementsByTagName('video');
    
    if (videos.length === 0) {
      console.log('No videos found on the page');
      return;
    }

    const video = videos[0]; // Select the first video

    // Firebase configuration (same as in popup.js)
    const firebaseConfig = {
      apiKey: "AIzaSyCuF7e-s97IOKrrJJWdjszLr-8h-U9KqSE",
  authDomain: "watchtogether-217ad.firebaseapp.com",
  projectId: "watchtogether-217ad",
  storageBucket: "watchtogether-217ad.firebasestorage.app",
  messagingSenderId: "955216907506",
  appId: "1:955216907506:web:b3df06bc45cfaf79a4546b",
  measurementId: "G-19SP8L3VMG"
    };

    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    const database = firebase.database();

    // Reference to the current room
    const roomRef = database.ref('rooms/' + currentRoom);

    // Sync video state
    video.addEventListener('play', () => {
      roomRef.child('videoState').set({
        action: 'play',
        time: video.currentTime
      });
    });

    video.addEventListener('pause', () => {
      roomRef.child('videoState').set({
        action: 'pause',
        time: video.currentTime
      });
    });

    video.addEventListener('seeked', () => {
      roomRef.child('videoState').set({
        action: 'seek',
        time: video.currentTime
      });
    });

    // Listen for video state changes
    roomRef.child('videoState').on('value', (snapshot) => {
      const state = snapshot.val();
      if (state) {
        switch(state.action) {
          case 'play':
            if (video.paused) {
              video.currentTime = state.time;
              video.play();
            }
            break;
          case 'pause':
            if (!video.paused) {
              video.pause();
            }
            break;
          case 'seek':
            video.currentTime = state.time;
            break;
        }
      }
    });
  }
})();
