// get DOM items so html can be inserted/extracted
var theLink = document.getElementById('broadband-link');
if (theLink !== null) {
    var theParent = document.getElementById('broadband');

    // extract URL from link
    theUrl = theLink.getAttribute('href');

    // extract postcode from link URL and remove _ char
    var n = theUrl.lastIndexOf('#');
    var thePostcode = theUrl.substring(n + 1);
    thePostcode = thePostcode.replace('_', ' ');

    // prepare form data for XHR request
    var formData = new FormData();
    formData.append("searchLocation", thePostcode);

    // run XHR request with extracted postcode
    var request = new XMLHttpRequest();
    request.open("POST", "http://www.rightmove.co.uk/ajax/broadband-speed-result.html", true);
    request.send(formData);

    request.onreadystatechange = function() {
        // dod the request process correctly
        if (request.readyState == 4 && request.status == 200) {

            // extract JSON response into array
            var response = JSON.parse(request.responseText);

            // prepare text for instertion into page
            var theText = document.createTextNode('The max speed is '+ response.superFastMaxSpeedRange + 'Mbps');

            // generate HTML element and insert into DOM tree
            var theElement = document.createElement('p');
            theElement.appendChild(theText);
            theParent.insertBefore(theElement, theLink);

            // update link text
            theLink.innerHTML = 'More details';
        }
    };
}