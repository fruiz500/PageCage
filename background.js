//this one opens tabs when clicking the icon
function openPage(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    	activeTab = tabs[0];
		if(typeof(activeTab.url) == 'undefined'){
			chrome.tabs.create({url: 'index.html'})
		}else{
			chrome.tabs.create({url: 'index.html#' + activeTab.url.split("?")[0]});		//remove query from URL as well
		}
		chrome.tabs.remove(activeTab.id);
		if(activeTab.url) chrome.history.deleteUrl({url: activeTab.url})
	});	
}

chrome.browserAction.onClicked.addListener(openPage);

//this one for links by right-click
function openLink(info,tab){
	if(info.linkUrl) chrome.tabs.create({url: 'index.html#' + info.linkUrl});
}

chrome.contextMenus.create({
	title: "Open Link in Cage", 
	contexts:["selection"], 
	onclick: openLink
});
