# Watch Together Chrome Extension

## Overview
Watch Together is a Chrome extension that allows users to synchronize video playback across different browsers in real-time.

## Features
- Create and join watch rooms
- Synchronize video play, pause, and seek actions
- Works with any website with HTML5 video players

## Setup Instructions

### Prerequisites
- Google Chrome Browser
- Firebase Account (for real-time synchronization)

### Installation
1. Clone this repository
2. Replace Firebase configuration in `popup.js` and `content.js` with your own Firebase project credentials
3. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the extension directory

### Firebase Setup
1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Realtime Database
3. Copy your Firebase configuration and replace the placeholders in the code

## How to Use
1. Click the extension icon
2. Create a new room or join an existing room
3. Share the Room ID with your friends
4. Start watching videos together!

## Technologies
- Chrome Extension API
- Firebase Realtime Database
- JavaScript

## Limitations
- Currently supports the first video element on the page
- Requires manual room ID sharing

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
