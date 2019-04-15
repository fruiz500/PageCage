// initialize things
window.onload = function() {


  //event listeners for buttons etc.
	window.addEventListener('resize', pageResize);

	clearBtn.addEventListener('click', clearURL);

	loadBtn.addEventListener('click', loadPage);

	hideBtn.addEventListener('click', hideBar);

	helpBtn.addEventListener('click', showHelp);

	pageURL.addEventListener('keyup', function(event) {URLKeyup(event)}, false);
	
	pageURL.addEventListener('change',function(){
		if(pageURL.value == "PassLok"){
			pageURL.value = "passlok.com/app";
			loadPage()
		}else if(pageURL.value == "Learn PassLok"){
			pageURL.value = "passlok.com/learn";
			loadPage()
		}else if(pageURL.value == "SeeOnce"){
			pageURL.value = "passlok.com/seeonce";
			loadPage()
		}else if(pageURL.value == "URSA"){
			pageURL.value = "passlok.com/ursa";
			loadPage()
		}else if(pageURL.value == "Image Stego"){
			pageURL.value = "passlok.com/stego";
			loadPage()
		}else if(pageURL.value == "Human Encryption"){	
			pageURL.value = "passlok.com/human";
			loadPage()
		}else if(pageURL.value == "PassLok Gen. Directory"){
			pageURL.value = "passlok.com/lockdir";
			loadPage()
		}
	});
	
	pageFrame.addEventListener('load', function(){
		msgArea.textContent = "Page loading. If blank, the server refused to have it framed";
		setTimeout(function(){ msgArea.textContent = "";},3000);
	});

//this from extension Ignore X-Frame headers, by Guillaume Ryder, Alex Dergachev
var HEADERS_TO_STRIP_LOWERCASE = [
  'content-security-policy',
  'x-frame-options',
	];

chrome.webRequest.onHeadersReceived.addListener(
  function(details) {
    return {
      responseHeaders: details.responseHeaders.filter(function(header) {
        return HEADERS_TO_STRIP_LOWERCASE.indexOf(header.name.toLowerCase()) < 0;
      })
    };
  }, {
    urls: ["<all_urls>"]
  }, ["blocking", "responseHeaders"]);
//end of Ignore X-Frame headers code

//to prevent the page from redirecting out
window.addEventListener('beforeunload', function (e) {
  // Cancel the event
  e.preventDefault();
  // Chrome requires returnValue to be set
  e.returnValue = '';
});
	
	pageResize();
	
	pageURL.focus()

}

//resizes iframe to fit the browser
function pageResize(){
	pageFrame.style.height = (document.documentElement.clientHeight - (topBar.style.display == 'none' ? 0 : 45)) + "px"
}

//loads or reloads a page into iframe
function loadPage(){
	var frame = document.getElementById('pageFrame'),
		src = pageURL.value;
	if(src.slice(0,4) != 'http'){
		src = 'https://' + src;			//complete URL, default is HTTPS
		pageURL.value = src
	}
	frame.src = '';
	setTimeout(function(){
			frame.src = src
	}, 0)
}

//delete stuff in input box
function clearURL(){
	pageURL.value = ''
}

//load page after typing Enter
function URLKeyup(evt){
	evt = evt || window.event;
	msgArea.textContent = '';
	var key = evt.keyCode || evt.which || evt.keyChar;
	if(key == 13) loadPage()
}

//hide the buttons and the box
function hideBar(){
	if(topBar.style.display == ''){
		topBar.style.display = 'none';
		pageFrame.style.height = (document.documentElement.clientHeight)  + "px"
	}else{
		topBar.style.display = '';
		pageFrame.style.height = (document.documentElement.clientHeight - 45) + "px"
	}
}

//display/hide help
function showHelp(){
	if(helpText.style.display == 'none'){
		helpText.style.display = 'block'
	}else{
		helpText.style.display = 'none'
	}
}
//end of body script.