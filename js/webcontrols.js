const urlz = require('url')


function go() {
    var url = document.getElementById('dest-input').value
    if(!(url.includes("://"))) {
        var aaaaa = urlz.parse("http://" + url).host.split(".")
        if (aaaaa[aaaaa.length - 1] in TLD && aaaaa.length > 1) {
            url = "http://" + url;
        } else {
            url = "http://google.com/search?q=" + urlz.format(url)
        }
    }
    document.getElementById(tabs[current].id).loadURL(url)
    document.getElementById('dest-input').value = url;
}

function stop() {
    document.getElementById(tabs[current].id).stop()
}

function home() {
    var url = store.get('home')
    if(!(url.includes("://"))) {
        url = "http://" + url;
    }
    document.getElementById(tabs[current].id).loadURL(url)
}

function sethome() {
    store.set('home', document.getElementById(tabs[current].id).getURL())
    document.getElementById('sethome-button').innerHTML = "&#10003;&#xFE0E;"
}

function forward() {
    document.getElementById(tabs[current].id).goForward();
}
function back() {
    document.getElementById(tabs[current].id).goBack();
}

function refresh() {
    document.getElementById(tabs[current].id).reload();
}

function myFunction() {
    document.getElementById("dropup").classList.toggle("show");
}
function myFunction2() {
    document.getElementById("dropup2").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
    var dropdowns2 = document.getElementsByClassName("dropdown-content2");
    var i2;
    for (i2 = 0; i2 < dropdowns2.length; i2++) {
      var openDropdown = dropdowns2[i2];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function devtools() {
    document.getElementById(tabs[current].id).inspectElement(0,0);
}

onload = function() {
    
}