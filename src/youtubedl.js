window.onload = function () {

  var videoDetails = ytplayer.config.args.player_response;
  var videoDetailsParse = JSON.parse(videoDetails);
  var videoDetailsCut = videoDetailsParse["streamingData"]["adaptiveFormats"];

  function removeDropdown() {
      var li = document.querySelectorAll("#download-dropdown ul li");
      for (var i = 0; i < li.length; i++) {
          if (li[i].style.display === "block") {
              li[i].style.display = "";
          }
      }
  }

  function clickDownload() {
      var li = document.querySelectorAll("#download-dropdown ul li");
      for (var i = 0; i < li.length; i++) {
          if (li[i].style.display === "") {
              li[i].style.display = "block";
          } else {
              li[i].style.display = "";
          }
      }
  }

  function getNameUrl(e) {
      var url = e.currentTarget.getAttribute("href");
      var name = document.querySelector("title").innerText;
      var datatype = e.currentTarget.getAttribute("data-type");
      var data = { url: url, name: name, sender: "YTDL", type: datatype };
      window.postMessage(data, "*");
  }

  var btn = document.createElement("ytd-button-renderer");
  btn.className = "style-scope ytd-menu-renderer force-icon-button style-text";
  btn.setAttribute("role", "button");
  btn.id = "download-button";
  btn.innerText = "Download";

  var anchor = document.createElement("a");
  anchor.id = "anchor";
  anchor.setAttribute("tabindex", "-1");
  anchor.className = "yt-simple-endpoint style-scope ytd-button-renderer";

  var btn_icon = document.createElement("yt-icon-button");
  btn_icon.className = "style-scope ytd-button-renderer style-default size-default";
  btn_icon.id = "button";

  var string = document.createElement("p");
  string.id = "text";
  string.className = "style-scope ytd-button-renderer style-default size-default";
  string.innerHTML = "Download";

  var place = document.getElementById("top-level-buttons");
  place.appendChild(btn);

  var btn1 = document.getElementById("download-button");
  btn1.appendChild(anchor);

  var anchor1 = document.getElementById("anchor");
  anchor1.appendChild(string);

  var dropdown = document.createElement("div");
  dropdown.id = "download-dropdown";
  document.body.appendChild(dropdown);

  var droplist = document.createElement("ul");
  dropdown.appendChild(droplist);

  for (var i = 0; i < videoDetailsCut.length; i++) {
      var item = document.createElement("li"); // Change "a" to "li"
      if (videoDetailsCut[i]['url'] == null) {
          continue;
      }
      var link = document.createElement("a");
      link.setAttribute("href", videoDetailsCut[i]['url']);
      link.setAttribute("target", "_blank");
      link.setAttribute("data-type", videoDetailsCut[i]['mimeType']);
      if (videoDetailsCut[i]['qualityLabel']) {
          link.innerText = videoDetailsCut[i]['qualityLabel'] + " " + videoDetailsCut[i]['mimeType'];
      } else {
          link.innerText = videoDetailsCut[i]['mimeType'];
      }
      link.addEventListener("click", getNameUrl);
      item.appendChild(link);
      droplist.appendChild(item);
  }

  if (i === 0) {
      btn.onclick = function () {
          alert("Couldn't generate links for this video!!");
      };
  } else {
      document.addEventListener("click", clicked);
  }
};
