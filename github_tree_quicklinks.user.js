// ==UserScript==
// @name          GitHub Tree Quicklinks
// @description   Saves you a click -- shows Raw, Blame, and History links in tree browser.
// @namespace     https://github.com/6/userscripts
// @include       http://www.github.com/*
// @include       https://www.github.com/*
// @include       http://github.com/*
// @include       https://github.com/*
// @version       0.0.1
// ==/UserScript==

github_url = function(parts, type) {
  return "<span style='color:#bbb;padding:0 2px'>[<a style='color:#6ad;padding:0 1px' href='"+["https://github.com", parts[1], type, parts[2]].join("/")+"'>"+type+"</a>]</span>";
}

var trees = document.getElementsByClassName("tree-browser");
var blob_regex = new RegExp(/^https?:\/\/github\.com\/([^\/]+\/[^\/]+)\/blob\/(.*)$/);
for(var i = 0; i < trees.length; i++) {
  var links = trees[i].getElementsByTagName("a");
  for(var j = 0; j < links.length; j++) {
    if(links[j].parentNode.className == "content") {
      var parts = blob_regex.exec(links[j].href);
      if(!parts) continue;
      links[j].parentNode.innerHTML += "<span style='color:#bbb;padding-right:9px'>&nbsp;</span>";
      links[j].parentNode.innerHTML += github_url(parts, 'raw');
      links[j].parentNode.innerHTML += github_url(parts, 'blame');
      links[j].parentNode.innerHTML += github_url(parts, 'commits');
    }
  }
}
