// Background service worker for the Watch Together extension
chrome.runtime.onInstalled.addListener(() => {
  console.log('Watch Together extension installed');
});

// Add Firebase SDK script injection
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'loading') {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: [
        'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js',
        'https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js'
      ]
    });
  }
});
