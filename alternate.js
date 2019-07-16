
// Send message to background script to indicate that this is not youtube site
var url = window.location.href;
if (url.indexOf("www.youtube.com") < 0) {
	chrome.runtime.sendMessage({greeting: "Not from youtube"}, function(response) {
  		console.log(response.farewell);
	});
}