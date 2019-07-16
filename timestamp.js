
function processData(allText) {
	var table = document.getElementById("content_table");
    var allTextLines = allText.split(/\r\n|\n/);

    for (var i=0; i<allTextLines.length; i++) {
    	
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
        button1.class = "timestamp_url";
        button1.innerHTML = url_text;
  		button1.style.border = "none";
  		button1.style.color = "#494b4f";
  		button1.style.padding = "5px";
  		button1.style.display = "inline-block";
  		button1.style.margin = "4px 2px";
  		button1.style.cursor = "pointer";
  		button1.style.width = "100%";

  		button1.addEventListener('click', function() {
    		chrome.tabs.getCurrent(function (tab) {
  				//Update the url here.
  				chrome.tabs.update({url: newUrl});
			});
    	});

        td1.appendChild(button1);
        td1.style.width = "200px";
        tr.appendChild(td1);

        // Add Keyword to corresponding URL
        var td2 = document.createElement('td');
        var div1 = document.createElement('div');
        div1.class = "text_area"
        div1.innerHTML = data[2];
        div1.style.padding = "5px";
        div1.style.margin = "4px 2px";
        td2.appendChild(div1);
        tr.appendChild(td2);

        table.appendChild(tr);
    }
    table.style.width = "500px";
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

