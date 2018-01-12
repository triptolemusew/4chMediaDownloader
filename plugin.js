
var count = 0;
var content = {};
var tab_title = '';

function display_DOM(results){
	h1 = results;
	console.log(h1[0][1]);
	var link = document.createElement("a");
	link.download = "one";
	link.href = h1[0][1];
	link.click();
  	document.querySelector("#ids").innerHTML = "<p>tab title: " + tab_title + "</p><p>dom h1: " + h1 + " </p>";
}

chrome.runtime.onMessage.addListener(function(request, sender){
	if (request.action == "getSource"){
		message.innerText = request.source;
	}
});

function checkPage(){
	//var popupDiv = document.getElementById(divName);
	var message = document.querySelector('#message');

	var button = document.getElementById('checkPage');
	var text = document.getElementById('numberImages');
  	var elems = document.body.getElementsByTagName("body");
  	var counts = document.getElementsByClassName("dialog");
  	var body = document.body.children;
  	var bun = document.querySelectorAll('button');
	button.addEventListener('click', function(){
		//text.textContent = "das";

		// chrome.tabs.getSelected(null, function(tab){
		// });
		//Getting the media files count
		for (var i = 0; i < elems.length; i++){
			count++;	
		}

		text.textContent = "asadsd";
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