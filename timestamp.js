
function processData(allText) {
	var table = document.getElementById("content_table");

	// Obtain one group of primary division + subdivisions
	var allDivisions = allText.split("\n$\n");

	// Process for each division
	for (var division=0; division<allDivisions.length; division++) {

		// Separate lines inside each division
		// First line is primary next lines are subdivisions
	    var allTextLines = allDivisions[division].split(/\r\n|\n/);

	    // Primary Division
	    var fields = allTextLines[0].split('\t');

	    // Set text for start and end timestamp
	    var url_text = fields[0]+" - "+fields[1];

	    // Set url on the timestamp
	    var newUrl = fields[3];

	    // Create new table row
        var tr = document.createElement('tr');

        // -------------------------------------------------------------
        // First Column: Append Time Stamp data with URL in table row
        var td1 = document.createElement('td');
        var button1 = document.createElement('button');

        // Add CSS to timestamp button
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
	
		// Add Event for timestmp click
		// URL of the current window should change on clicking
  		button1.addEventListener('click', function() {
    		chrome.tabs.getCurrent(function (tab) {
  				//Update the URL of current tab here
  				chrome.tabs.update({url: newUrl});
			});
    	});
       	td1.appendChild(button1);
       	td1.style.width = "150px";
       	td1.style.padding = "10px";
       	td1.style.margin = "4px 0px 4px 0px";
       	tr.appendChild(td1);

       	// First Column Ends here
       	//-------------------------------------------------------------------

       	//-------------------------------------------------------------------
       	// Second Column: Dropdown for subdivions
        var td2 = document.createElement('td');
        var select1 = document.createElement('select');

        var defOpt = document.createElement('option');
        defOpt.innerHTML = fields[2];
        defOpt.style.width = "100%";
        select1.appendChild(defOpt);

	    // Process Subdivions
    	for (var i=1; i<allTextLines.length; i++) {
    	
    		// Obtain all fields separately
        	var data = allTextLines[i].split('\t');
        	
        	// Select option text:
        	var option1 = document.createElement('option');
        	option1.innerHTML = data[0] + " - " + data[1] + " : " + data[2];
        	option1.style.width = "100%";
        	select1.appendChild(option1);
    	}

    	// Add CSS to select
    	select1.style.width = "100%";
    	select1.style.fontSize = "14px";
    	select1.style.color = "#4c5054";
    	select1.style.fontFamily = '"Segoe UI",Arial,sans-serif';
    	select1.style.padding = "5px 0px 5px 0px";
    	select1.style.border = "2px solid";
    	select1.style.borderColor = "#15c39a";
  		select1.style.borderRadius = "8px";
  		select1.style.background = "white";

    	td2.appendChild(select1);
        td2.style.width = "300px";
        td2.style.padding = "10px";
        td2.style.margin = "4px 0px 4px 0px";
        tr.appendChild(td2);

        // Second Column ends here
        //----------------------------------------------------------------------


        table.appendChild(tr);
    }

    // Update table
    table.style.width = "500px";
    document.body.appendChild(table);
}


// ----------------------------------------------------------------
// Method 1:
// Read Data as Text file (working)
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


// -----------------------------------------------------------------
// Method 2:
// Call python function to get data dynamically through flask (NOT WORKING!!!)
function callPythonFunction(link) {
	var xhr = new XMLHttpRequest();
    var url = "localhost:5000/"+link;
    xhr.open("GET", "/"+link, true);

    xhr.onreadystatechange = function() {
      	if(xhr.readyState === 4 && xhr.status == 200) {
      		alert(xhr.responseText);
        	receivedContent = JSON.parse(this.responseText);
        	alert(receivedContent);
        	processData(receivedContent);
      	}
    };

	// // ---------------------------------------------------------------
    // // Method 3:
    // // Call Python through JQuery (not working)
    // 	$.ajax({
  		// type: "GET",
 		// url: "./dummy.py",
  		// data: { param: url},
  		// success: processData
	// });
} 


// //-----------------------------------------------------------------
// // Method 4:
// // Execute shell command to get data (not working)
// function execute(command) {
//   	const exec = require('child_process').exec;
//   	var allText = exec(command, (err, stdout, stderr) => {
//   		return stdout;
//   	});
//   	processData(allText);
// }



document.addEventListener('DOMContentLoaded', function() {
	chrome.tabs.getSelected(null, function(tab){
    	var url = tab.url;
    	// Method 2 & 3
		callPythonFunction(url);

		// // Method 1
		// readTextFile("data.csv");

		// Method 4
		// execute('python dummy.py' + url);
	});
		
});

