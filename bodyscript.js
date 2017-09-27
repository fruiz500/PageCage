// initialize things
window.onload = function() {


  //event listeners for buttons etc.
	window.addEventListener('resize', pageResize);

	clearBtn.addEventListener('click', clearURL);

	loadBtn.addEventListener('click', loadPage);

	hideBtn.addEventListener('click', hideBar);
	
	pageURL.addEventListener('keyup', function(event) {URLKeyup(event)}, false);
	
	pageFrame.addEventListener('load', function(){
		msgArea.textContent = "Page loaded. If blank, the server refused to have it framed";
		setTimeout(function(){ msgArea.textContent = "";},3000);
	});
	
	pageResize();
	
	pageURL.focus()

}

//resizes iframe to fit the browser
function pageResize(){
	pageFrame.style.height = (document.documentElement.clientHeight - (topBar.style.display == 'none' ? 20 : 65)) + "px"
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

//delete stuff in inpiut box
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
		pageFrame.style.height = (document.documentElement.clientHeight - 20)  + "px"
	}else{
		topBar.style.display = '';
		pageFrame.style.height = (document.documentElement.clientHeight - 65) + "px"
	}
}
//end of body script.