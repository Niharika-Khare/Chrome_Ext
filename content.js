
// Send message to background script to indicate that this is youtube site
chrome.runtime.sendMessage({greeting: "From youtube"}, function(response) {
  console.log(response.farewell);
});