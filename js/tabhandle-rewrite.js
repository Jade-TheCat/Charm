var current = 0
var tabs = [{}]
var loaded = false;
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 60;
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  
function createTab(src, first) {
    var id = "tab-" + makeid()
    if (!(first === true)) {
        tabs.push({
            id: id,
            buttonid: id + "-button"
        })
    } else {
        tabs[0]={
            id: id,
            buttonid: id + "-button"
        }
    }
    var temp = document.createElement('webview');
    temp.id = id; temp.src = src;
    document.getElementById("tabs").appendChild(temp)
    var temp2 = document.createElement('button');
    temp2.id=id+"-button"; temp2.setAttribute("onclick", "changeTab(current, '" + id + "')"); temp2.type="button"; temp2.innerHTML=id.replace("webpage-", "")
    document.getElementById("dropup2").appendChild(temp2)
    document.getElementById(id).setAttribute('style', 'width: 100%; height: calc(100% - 60px); position: absolute; display: none;');
    var wv = document.getElementById(id)
    
    wv.addEventListener('dom-ready', function () {
        wv.insertCSS(`::-webkit-scrollbar {     
            background-color: #23272A;
            width: .8em
        }
        ::-webkit-scrollbar:horizontal {
            height: .8em
        }
        ::-webkit-scrollbar-corner {
            background-color: #23272A;
        }
        ::-webkit-scrollbar-thumb:window-inactive,
        ::-webkit-scrollbar-thumb {
                background:  #99AAB5;
        }`)
    });
    wv.addEventListener('did-start-loading', function() {
        wv.getWebContents().setUserAgent('Charm 0.1a');
    })
}
function createFirstTab() {
    
}
function deleteTab(number) {
    document.getElementById("tabs").removeChild(document.getElementById(tabs[number].id))
}
function deselectTab(number) {
    var id = tabs[number].id
    var tab = document.getElementById(id)
    if (tab.classList.contains("active")) {
        tab.classList.remove("active")
    }
}
function selectTab(number) {
    var id = tabs[number].id
    var tab = document.getElementById(id)
    if (!tab.classList.contains("active")) {
        tab.classList.add("active")
    }
}
function update() {
    var webview = document.getElementById('webpage-active');
    var gostop = document.getElementById("gostop");
    var back = document.getElementById("back");
    var forward = document.getElementById('forward');
    if (loaded === false) {
        webview.setAttribute('src', store.get('home'))
        document.getElementById('dest-input').value = store.get('home')
        loaded = true;
    } else {
        if (option.dev === true) {
            document.title = webview.getTitle() + " - Charm - Dev";
        } else {
            document.title = webview.getTitle() + " - Charm";
        }
        
        gostop.setAttribute('onclick', 'go()')
        gostop.innerHTML = "&#9002;&#xFE0E;"
        back.setAttribute('style', "color: white;")
        forward.setAttribute('style', "color: white;")
        if(!webview.canGoBack()) {
            back.setAttribute('style', "color: gray;")
        }
        if(!webview.canGoForward()) {
            forward.setAttribute('style', "color: gray;")
        }
        document.getElementById('sethome-button').innerHTML = "&#9733;&#xFE0E;"
        if(store.get('home') === webview.getURL()) {
            document.getElementById('sethome-button').innerHTML = "&#10003;&#xFE0E;"
        }
        document.getElementById('dest-input').value = document.getElementById("webpage-active").getURL()
    }
    document.getElementById("dest-input").addEventListener("keyup", function(event) {
        if((event.key !== "Enter") && (event.key !== "")) return;
        document.getElementById("gostop").click();
        event.preventDefault();
    });

    var loadstart = function() {
        gostop.setAttribute('onclick', 'stop()')
        gostop.innerHTML = "&#10005;&#xFE0E;"
        
    }
    var loadstop = function() {
        document.getElementById('dest-input').value = document.getElementById('webpage-active').getURL()
        if (option.dev === true) {
            document.title = webview.getTitle() + " - Charm - Dev";
        } else {
            document.title = webview.getTitle() + " - Charm";
        }
        
        gostop.setAttribute('onclick', 'go()')
        gostop.innerHTML = "&#9002;&#xFE0E;"
        back.setAttribute('style', "color: white;")
        forward.setAttribute('style', "color: white;")
        if(!webview.canGoBack()) {
            back.setAttribute('style', "color: gray;")
        }
        if(!webview.canGoForward()) {
            forward.setAttribute('style', "color: gray;")
        }
        document.getElementById('sethome-button').innerHTML = "&#9733;&#xFE0E;"
        if(store.get('home') === webview.getURL()) {
            document.getElementById('sethome-button').innerHTML = "&#10003;&#xFE0E;"
        }
    }
    var goFull = function() {
        document.getElementById('webpage-active').setAttribute('style', 'width: 100%; height: 100%; position: absolute; z-index: 1;');
        remote.BrowserWindow.setFullScreen(true);
    }
    var leaveFull = function() {
        document.getElementById('webpage-active').setAttribute('style', 'width: 100%; height: calc(100% - 60px); position: absolute;');
        remote.BrowserWindow.setFullScreen(false);
    }
    webview.addEventListener("did-start-loading", loadstart);
    webview.addEventListener("did-stop-loading", loadstop);
    webview.addEventListener("enter-html-full-screen", goFull);
    webview.addEventListener("leave-html-full-screen", leaveFull);
}
function changeTab(fromId, toId) {
    deselectTab(fromID)
    selectTab(toId)
    update()
}
function createNextTab() {
    
}
createFirstTab()
selectTab(0)