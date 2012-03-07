// ==UserScript==
// @name          Pixiv Quick Fullsize
// @description   Gives you quick access to the fullsize image on pixiv.net.
// @namespace     https://github.com/6/userscripts
// @include       http://www.pixiv.net/*
// @include       http://pixiv.net/*
// @version       0.0.1
// ==/UserScript==

(function() {
  create_a = function(href, inner) {
    var a = document.createElement("a");
    a.href = href;
    a.innerHTML = inner || "Direct Link &rarr;";
    return a;
  };
  
  create_img = function(src) {
    var img = document.createElement("img");
    img.src = src;
    return img;
  };
  
  // replace medium images with full-size images
  var images = document.getElementsByTagName('img');
  var image_src_regex = new RegExp(/pixiv\.(net\/img\/[^\/]+\/[0-9]+)_m\./);
  for(var i=0; i< images.length; i++) {
    var match = image_src_regex.exec(images[i].src);
    if(match) {
      var src = images[i].src.split(".");
      src[src.length - 2] = match[1];
      var full_size_url = src.join(".");
      // have to create new element instead of just replacing img src
      images[i].parentNode.appendChild(create_a(full_size_url));
      images[i].parentNode.appendChild(create_img(full_size_url));
      images[i].parentNode.removeChild(images[i]);
    }
  }
})();
