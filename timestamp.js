
function processData(allText) {
	var table = document.getElementById("content_table");
    var allTextLines = allText.split(/\r\n|\n/);

    for (var i=0; i<allTextLines.length; i++) {
    	
    	// Obtain all fields separately
        var data = allTextLines[i].split(' ');

        // Set text for start and end timestamp
        var url_text = data[0]+" - "+data[1];

        // Set url on the timestamp
        var newUrl = data[3];

        // Create new table row
        var tr = document.createElement('tr');

        // Append Time Stamp data with url in table row
        var td1 = document.createElement('td');
        var button1 = document.createElement('button');

        // Add CSS to button
        button1.class = "timestamp_url";
        button1.innerHTML = "<b>" + url_text + "</b>";
        button1.style.background = "#15c39a";
  		button1.style.border = "none";
  		button1.style.color = "white";
  		button1.style.fontSize = "14px";
  		button1.style.fontFamily = '"Segoe UI",Arial,sans-serif';
  		button1.style.display = "inline-block";
  		button1.style.cursor = "pointer";
  		button1.style.width = "100%";
  		button1.style.padding = "5px 0px 5px 0px";
  		button1.style.borderRadius = "8px";

  		button1.addEventListener('click', function() {
    		chrome.tabs.getCurrent(function (tab) {
  				//Update the URL of current window here
  				chrome.tabs.update({url: newUrl});
			});
    	});

        td1.appendChild(button1);
        td1.style.width = "150px";
        td1.style.padding = "10px";
        td1.style.margin = "4px 0px 4px 0px";
        tr.appendChild(td1);

        // Add Keyword to corresponding URL
        var td2 = document.createElement('td');
        var div1 = document.createElement('div');

        // Add CSS to div
        div1.class = "text_area"
        div1.innerHTML = data[2];
        div1.style.padding = "8px 3px 8px 3px";
        td2.appendChild(div1);
        td2.style.width = "250px";
        td2.style.padding = "10px";
        td2.style.margin = "4px 0px 4px 0px";
        tr.appendChild(td2);

        table.appendChild(tr);
    }
    table.style.width = "450px";
    document.body.appendChild(table);
}

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                processData(allText);
            }
        }
    }
    rawFile.send(null);
}

document.addEventListener('DOMContentLoaded', function() {
	readTextFile("data.csv");	
});

