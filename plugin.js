
var count = 0;
var content = {};
var tab_title = '';

function download_All(list){
	var link;
	for (var i = 0; i < list.length; i++)
	{
		link = document.createElement("a");
		link.download = "one";
		link.href = list[i];
		link.click();
	}
}

function display_DOM(results){
	h1 = results;
  	document.querySelector("#ids").innerHTML = "<p>Thread: " + tab_title + "<br>";
  	document.querySelector("#numberImages").innerHTML = "No. of Images: " + h1[0].length;
  	var node;
  	var textnode;
  	console.log(h1[0].length);
  	for (var i = 0; i < h1[0].length; i++)
  	{
  		node = document.createElement("li");
  		linknode = document.createElement("a");
  		linknode.href = h1[0][i];
  		linknode.textContent = h1[0][i];
  		node.appendChild(linknode);
  		document.getElementById("List").appendChild(node);
  	}
  	document.getElementById("DownloadAll").onclick = function() {download_All(h1[0])};
}

chrome.runtime.onMessage.addListener(function(request, sender){
	if (request.action == "getSource"){
		message.innerText = request.source;
	}
});

function checkPage(){
	var message = document.querySelector('#message');
	var button = document.getElementById('checkPage');
	var text = document.getElementById('numberImages');
  	var elems = document.body.getElementsByTagName("body");
  	var counts = document.getElementsByClassName("dialog");
  	var body = document.body.children;
  	var bun = document.querySelectorAll('button');
  	var a = document.getElementById("DownloadAll");
	button.addEventListener('click', function(){
		// chrome.tabs.getSelected(null, function(tab){
		// });
		//Getting the media files count
		for (var i = 0; i < elems.length; i++){
			count++;	
		}

		//text.appendChild(document.createTextNode(count));
		// text.textContent = bun[0].innerHTML;

		// chrome.tabs.executeScript(null, {
		// 	file: "getPagesSource.js"
		// }, function(){
		// 	if (chrome.runtime.lastError){
  //    			message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
		// 	}
		// });
		var nodeList = 'var list = document.querySelectorAll(".file-info"); result = []; for (var i = 0; i< list.length; i++) { result.push(list[i].childNodes[0].href);} result;'
		chrome.tabs.query({active: true}, function(tabs) {
		  var tab = tabs[0];
		  tab_title = tab.title;
		  chrome.tabs.executeScript(tab.id, {
		    code: nodeList
		  }, display_DOM);
		});
		//Can also use
		//code: 'document.querySelector(".fileText").innerHTML'
		//text.appendChild(document.createTextNode("dsa"));
	});
}

document.addEventListener('DOMContentLoaded', function(){
	checkPage();
});