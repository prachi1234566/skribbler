// ==UserScript==
// @name Skribbler
// @namespace https://rosshill.ca
// @match *://skribbl.io/*
// @version 2.2.3
// @author Ross Hill
// @downloadURL https://raw.githubusercontent.com/rosslh/skribbler/master/skribbler.user.js
// @icon https://skribbl.io/res/favicon.png
// @homepageURL https://github.com/rosslh/skribbler
// @connect skribbler.herokuapp.com
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant GM.xmlHttpRequest
// @grant GM_xmlhttpRequest
// ==/UserScript==

// This code has been compiled and minified. The source code and build script can be found on Github.

var i={pattern:"",content:document.createElement("span"),wordsList:$(document.createElement("ul")),prevClue:"",links:document.createElement("strong"),prevAnswer:""};function s(){$("#screenGame").is(":visible")&&$(this).scrollTop()<$("#screenGame").offset().top&&$("html, body").animate({scrollTop:$("#screenGame").offset().top},1e3)}function a(e,n){var t=$(".drawing").is(":visible"),r=e.replace(/_/g,"").length;return!(!t||!(0<unsafeWindow.dictionary.oneOffWords.length||n<=r&&r!==e.length))||(t||(unsafeWindow.dictionary.validAnswers=[],unsafeWindow.dictionary.guessed=[],unsafeWindow.dictionary.oneOffWords=[]),!1)}function d(){return!!$(".guessedWord .info .name[style='color: rgb(0, 0, 255);']").length&&(unsafeWindow.dictionary.validAnswers=[],unsafeWindow.dictionary.guessed=[],unsafeWindow.dictionary.oneOffWords=[],!0)}function o(e,n){for(var t=1;t<n.length+1;t++)if(e===n.substring(0,t-1)+n.substring(t,n.length))return!0;return!1}function l(e,n){if(e.length===n.length){for(var t=0,r=0;r<e.length;r++)if(e.charAt(r)!==n.charAt(r)&&(t+=1),1<t)return!1;return 1===t}return e.length===n.length-1?o(e,n):n.length===e.length-1&&o(n,e)}function u(e,n){if(-1!==unsafeWindow.dictionary.guessed.indexOf(n))return!1;for(var t=0;t<unsafeWindow.dictionary.oneOffWords.length;t++)if(!l(n,unsafeWindow.dictionary.oneOffWords[t]))return!1;for(var r=0;r<e.length;r++)if(l(n,e[r]))return!1;return!0}function c(e){return new RegExp("^"+e.replace(/_/g,"[^- ]")+"$")}function f(e){var n=unsafeWindow.dictionary,t=void 0;0===n.validAnswers.length&&0===n.guessed.length?(t=n.confirmed.slice(),n.standard.forEach(function(e){-1===t.indexOf(e)&&t.push(e)})):t=n.validAnswers;var r=[];i.pattern=c(e);var o=[];if(n.guessed.forEach(function(e){-1===n.oneOffWords.indexOf(e)&&o.push(e)}),!d())for(var s=0;s<t.length;s++)t[s].length===e.length&&i.pattern.test(t[s])&&u(o,t[s])&&r.push(t[s]);return unsafeWindow.dictionary.validAnswers=r}function p(e){var n=$(document.createElement("ul"));if(n.css({width:"70%",margin:"0 auto","margin-top":"10px","background-color":"#eee",padding:"4px","border-radius":"2px","list-style-position":"inside",columns:"4",display:i.wordsList.css("display"),visibility:i.wordsList.css("visibility")}),a(e,0)&&!d())for(var t=f(e),r=0;r<t.length;r++){var o=document.createElement("li");o.innerText=t[r],n[0].appendChild(o)}i.wordsList.html(n.html())}function h(){return $("#currentWord")}function g(){return h()[0].textContent.toLowerCase()}function w(){var e,n=void 0!==(e=$(".info .name[style='color: rgb(0, 0, 255);")[0])?e.innerText.split(" (")[0]:"";if(n)for(var t=$("#boxMessages p[style='color: rgb(0, 0, 0);'] b:contains("+n+":)").parent().find("span").not(".skribblerHandled").slice(-10),r=0;r<t.length;r++){var o=t[r].innerText;-1===unsafeWindow.dictionary.guessed.indexOf(o)&&(unsafeWindow.dictionary.guessed.push(o),t[r].classList.add("skribblerHandled"),p(g()))}}function m(){return $("#inputChat")}function v(){var e=g(),n=m()[0],t=e.length-n.value.length;i.content.textContent=t,i.content.style.color="unset",0<t?(i.content.textContent="+"+i.content.textContent,i.content.style.color="green"):t<0&&(i.content.style.color="red"),i.pattern=c(e);var r=c(e.substring(0,n.value.length));i.pattern.test(n.value.toLowerCase())?n.style.border="3px solid green":r.test(n.value.toLowerCase())?n.style.border="3px solid orange":n.style.border="3px solid red"}function b(){var e,n=g();n!==i.prevClue&&(i.prevClue=n,v(),p(n),0<(e=n).length&&-1===e.indexOf("_")?(i.links.innerHTML="<a style='color: blue' target='_blank' href='https://www.google.ca/search?tbm=isch&q="+e+"'>Images</a>, ",i.links.innerHTML+="<a style='color: blue' target='_blank' href='https://www.google.ca/search?tbm=isch&tbs=itp:lineart&q="+e+"'>Line art</a>"):i.links.innerHTML="")}function y(e,n){var t,r,o,s=$("#overlay .content .text")[0].innerText;"The word was: "===s.slice(0,14)&&(s=s.slice(14))!==i.prevAnswer&&(i.prevAnswer=s,unsafeWindow.dictionary.oneOffWords=[],unsafeWindow.dictionary.guessed=[],unsafeWindow.dictionary.validAnswers=[],t=s,r=e,o=n,GM.xmlHttpRequest({method:"POST",data:JSON.stringify({word:t}),headers:{"Content-Type":"application/json",Authorization:"Basic "+btoa(r+":"+o)},url:"https://skribbler.herokuapp.com/api/words",onload:function(e){(e.status<200||300<=e.status)&&409!==e.status&&alert("Could not add '"+t+"' to your confirmed words.")}}))}function x(e,n){$("#audio").css({left:"unset",right:"0px"}),window.setInterval(s,2e3),$(i.links).css({padding:"0 1em 0 1em"}),h().after(i.links);var t=$("#formChat")[0];$(i.content).css({position:"relative",left:"295px",top:"-25px"}),i.wordsList.css({width:"70%",margin:"0 auto","margin-top":"10px","background-color":"#eee",padding:"4px","border-radius":"2px","list-style-position":"inside",columns:"4"}),t.appendChild(i.content),$("#screenGame")[0].appendChild(i.wordsList[0]),m()[0].style.border="3px solid orange",window.setInterval(function(){b(),y(e,n),function(){for(var e=$("#boxMessages p[style='color: rgb(204, 204, 0); font-weight: bold;'] span:contains( is close!)").not(".skribblerHandled").slice(-10),n=0;n<e.length;n++){var t=e[n].innerText.split("'")[1];-1===unsafeWindow.dictionary.oneOffWords.indexOf(t)&&(unsafeWindow.dictionary.oneOffWords.push(t),e[n].classList.add("skribblerHandled"),p(g()))}}(),w(),$(i.wordsList).is(":visible")?0!==i.wordsList.children().length&&!d()&&a(g(),0)||i.wordsList.hide():i.wordsList.is(":hidden")&&0<i.wordsList.children().length&&!d()&&a(g(),0)&&i.wordsList.show(),$(".modal-dialog:contains(Are you still here?)").is(":visible")&&document.hidden&&alert("Action required.")},1e3),$("#formChat").append($('<div style="background-color:#eee; position:relative; top:-20px; padding:0 5px; width:auto; margin:0;"><input id="guessEnabled" name="guessEnabled" style="width:5px; height:5px; filter: brightness(0.8);" type="checkbox"><label for="guessEnabled" style="all: initial; padding-left:5px;">Enable auto-guesser</label></div>'));var r=0,o=0;window.setInterval(function(){$("#guessEnabled").is(":checked")&&1500<Date.now()-o&&1500<Date.now()-r&&(r=Date.now(),function(e){if(a(e,1)&&!d()){var n=f(e),t=[];n.forEach(function(e){-1<unsafeWindow.dictionary.confirmed.indexOf(e)&&t.push(e)});var r=void 0;r=0<t.length?t[Math.floor(Math.random()*t.length)]:n[Math.floor(Math.random()*n.length)];var o=Object.keys(unsafeWindow.formChat).filter(function(e){return~e.indexOf("jQuery")})[0];window.setTimeout(function(){""===m().val()&&a(e,1)&&!d()&&(m().val(r),unsafeWindow.formChat[o].events.submit[0].handler())},Math.floor(800*Math.random()))}}(g()))},1e3),m().keyup(function(){o=Date.now()}),m().keyup(v)}function W(t,r){GM.xmlHttpRequest({method:"GET",url:"https://skribbler.herokuapp.com/api/default",headers:{Authorization:"Basic "+btoa(t+":"+r)},onload:function(e){unsafeWindow.dictionary.standard=JSON.parse(e.responseText),GM.xmlHttpRequest({method:"GET",url:"https://skribbler.herokuapp.com/api/words",headers:{Authorization:"Basic "+btoa(t+":"+r)},onload:function(e){if(e.status<300&&200<=e.status){alert("Login successful, words retrieved."),unsafeWindow.dictionary.confirmed=JSON.parse(e.responseText);var n=window.setInterval(function(){h()&&(clearInterval(n),x(t,r))},500)}else alert("Confirmed words not retrieved. Please try again later.")}})}})}function k(){var n,t,e=void 0,r=void 0,o=prompt("Have you already created your skribbler account? (yes/no)").toLowerCase();"yes"===o?W(e=prompt("Please enter your skribbler username").toLowerCase(),r=prompt("Please enter your skribbler password")):"no"===o?(e=prompt("Please enter a username").toLowerCase(),(r=prompt("Please enter a unique password"))===prompt("Reenter password")&&(n=e,t=r,GM.xmlHttpRequest({method:"POST",data:JSON.stringify({username:n,password:t}),headers:{"Content-Type":"application/json"},url:"https://skribbler.herokuapp.com/api/users",onload:function(e){201===e.status?(alert("User created."),W(n,t)):409===e.status?alert("User already exists. Please reload and try another username."):alert("User creation unsuccessful. Please try again later.")}}))):k()}unsafeWindow.dictionary={standard:[],confirmed:[],oneOffWords:[],guessed:[],validAnswers:[]},$(document).ready(function(){"undefined"==typeof GM&&(GM={xmlHttpRequest:GM_xmlhttpRequest});var e=$("<button>Activate skribbler</button>");e.css({"font-size":"0.6em"}),$(".loginPanelTitle").first().append(e),e.click(function(){e.hide(),k()})});