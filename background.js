
// Receive message from content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    console.log(sender.tab ? "From a content script:" + sender.tab.url : "From the extension");

    // Check that this is youtube site
    if (request.greeting == "From youtube") {

    	// Set Popup on the extension button 
    	chrome.browserAction.setPopup({
			popup : "popup.html"
		});
    	// Send Response message
	    sendResponse({farewell: "Popup set succesfully"});
    }
    else {
    	// Set Popup on the extension button 
    	chrome.browserAction.setPopup({
			popup : ""
		});
    	// Send Response message
	    sendResponse({farewell: "Popup removed succesfully"});
    }
  });